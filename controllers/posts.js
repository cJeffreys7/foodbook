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
    res.redirect('posts')
  })
}

function indexFavorites(req, res) {
  console.log('Show favorite posts')
  // Profile.findById(req.params.id)
  // .populate('favoritePosts')
  // .then(posts => {
  //   if (!posts.length) {
  //     throw new Error ('No Favorite Posts')
  //   }
  //   res.render('posts/index', {
  //     title: 'Favorite Posts',
  //     posts
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.redirect('posts')
  // })
}

function newPost(req, res) {
  res.render('posts/new', {
    title: 'New Post'
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
      res.redirect('posts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('posts')
  })
}

export {
  index,
  indexFavorites,
  newPost as new,
  create
}