import { Profile } from "../models/profile.js"
import { Post } from "../models/post.js"

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('posts')
  .then(profile => {
    Profile.findById(req.user.profile._id)
    .then(self => {
      const isSelf = self._id.equals(profile._id)
      Post.find({owner: req.params.id})
      .populate('owner')
      .then(posts => {
        console.log('Followed profiles:', profile.followedProfiles)
        profile.posts = posts
        res.render('profiles/show', {
          title: 'Show Profile',
          profile,
          isSelf,
          self
        })
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