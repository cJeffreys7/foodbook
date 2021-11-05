import { Profile } from "../models/profile.js"
import { Post } from "../models/post.js"

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('posts')
  .then(profile => {
    Post.find({owner: req.params.id})
    .populate('owner')
    // profile.posts.populate('owner')
    .then(posts => {
      res.render('profiles/show', {
        title: 'Show Profile',
        profile,
        posts: posts
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`profiles/${req.user.profile._id}`)
  })
}

export {
  show
}