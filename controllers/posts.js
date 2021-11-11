import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'
import { upload } from '../middleware/upload.js'
import { dbConfig } from '../config/database.js'
import { MongoClient } from 'mongodb'
import { GridFSBucket } from 'mongodb'
// const MongoClient = require("mongodb").MongoClient
// const GridFSBucket = require("mongodb").GridFSBucket

const url = process.env.DATABASE_URL

const baseUrl = "http://localhost:3000/files/"

const mongoClient = new MongoClient(url)

function index(req, res) {
  Post.find({})
  .populate('owner')
  .then(posts => {
    res.render('posts', {
      title: 'Newsfeed',
      posts
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function indexFavorites(req, res) {
  Profile.findById(req.params.id)
  .populate('favoritePosts')
  .then(profile => {
    if (!profile.favoritePosts.length) {
      throw new Error ('No Favorite Posts')
    }
    Post.find({favorites: req.user.profile._id})
      .populate('owner')
      .then(posts => {
        res.render('posts', {
          title: 'Favorite Posts',
          posts: posts
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function newPost(req, res) {
  res.render('posts/new', {
    title: 'New Post'
  })
}

function edit(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    res.render('posts/edit', {
      title: 'Edit Post',
      post
    })
  })
}

function create(req, res) {
  console.log('File:', req.body)
  req.body.owner = req.user.profile._id
  Post.create(req.body)
  .then(post => {
    Profile.findById(req.user.profile._id)
    .then(profile => {
      profile.posts.push(post._id)
      profile.save()
      res.redirect('/posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

async function uploadFiles(req, res) {
  try {
    await upload(req, res)
    console.log("Uploaded file", req.file)
    if (req.file === undefined) {
      res.send({
        message: "You must select a file."
      })
    }
    res.send({
      message: "File has been uploaded."
    })
  } catch (error) {
    console.log("Error:", error)
    res.send({
      message: `Error when trying to upload image: ${error}`
    })
  }
}

async function getListFiles(req, res) {
  try {
    await mongoClient.connect()
    const database = mongoClient.db(dbConfig.database)
    const images = database.collection("uploads.files")
    const cursor = images.find({})
    if ((await cursor.count()) === 0) {
      res.status(500).send({
        message: "No files found!"
      })
    }
    let fileInfos = []
    await cursor.forEach(doc => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename
      })
    })
    console.log('Files:', fileInfos)
    res.status(200).send(fileInfos)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

async function download(req, res) {
  try {
    await mongoClient.connect()
    const database = mongoClient.db(dbConfig.database)
    const bucket = new GridFSBucket(database, {
      bucketName: 'uploads'
    })
    let downloadStream = bucket.openDownloadStreamByName(req.params.name)
    downloadStream.on("data", function(data) {
      res.status(200).write(data)
    })
    downloadStream.on("error", function(err) {
      res.status(404).send({
        message: "Cannot download the Image!"
      })
    })
    downloadStream.on("end", () => {
      res.end()
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

function createComment(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    req.body.name = req.user.profile.name
    req.body.avatar = req.user.profile.avatar
    req.body.ownerId = req.user.profile._id
    post.comments.push(req.body)
    post.save()
    res.redirect('/posts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/posts')
  })
}

function update(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    post.text = req.body.text
    post.save()
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function updateComment(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    const foundId = post.comments.findIndex(comment => comment.toString().includes(req.params.commentId))
    if (foundId >= 0) {
      post.comments[foundId].text = req.body.text
    } else {
      console.log('Unable to find comment id')
    }
    post.save()
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function toggleLike(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    const foundId = post.likes.findIndex(like => like.toString().includes(req.user.profile._id))
    if (foundId >= 0) {
      post.likes.splice(foundId, 1)
    } else {
      post.likes.push(req.user.profile._id)
    }
    post.save()
    res.status(204).send()
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function toggleCommentLike(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    const foundId = post.comments.findIndex(comment => comment.toString().includes(req.params.commentId))
    if (foundId >= 0) {
      const foundLikeId = post.comments[foundId].likes.findIndex(like => like.toString().includes(req.user.profile._id))
      if (foundLikeId >= 0) {
        post.comments[foundId].likes.splice(foundLikeId, 1)
      } else {
        post.comments[foundId].likes.push(req.user.profile._id)
      }
    } else {
      console.log('Unable to find comment id')
    }
    post.save()
    res.status(204).send()
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deletePost(req, res) {
  Post.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteComment(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    const foundId = post.comments.findIndex(comment => comment.toString().includes(req.params.commentId))
    if (foundId >= 0) {
      post.comments.splice(foundId, 1)
    } else {
      console.log('Unable to find comment id')
    }
    post.save()
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  indexFavorites,
  newPost as new,
  edit,
  create,
  createComment,
  update,
  updateComment,
  toggleLike,
  toggleCommentLike,
  deletePost as delete,
  deleteComment,
  uploadFiles,
  getListFiles,
  download
}