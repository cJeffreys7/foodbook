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
  newPost as new,
  create
}