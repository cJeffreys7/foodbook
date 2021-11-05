import { Post } from '../models/post.js'

function newPost(req, res) {
  res.render('posts/new', {
    title: 'New Post'
  })
}

function create(req, res) {
  Post.create(req.body)
  .then(post => {
    res.redirect('/')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  newPost as new,
  create
}