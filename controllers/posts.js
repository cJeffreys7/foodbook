import { Post } from '../models/post.js'
import { Profile } from '../models/profile.js'

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

function createComment(req, res) {
  Post.findById(req.params.id)
  .then(post => {
    req.body.name = req.user.profile.name
    req.body.avatar = req.user.profile.avatar
    req.body.ownerId = req.user.profile._id
    console.log('Comment content:', req.body)
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
      console.log('Found comment id:', foundId)
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
      console.log('Found comment id:', foundId)
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
  deletePost as delete,
  deleteComment
}