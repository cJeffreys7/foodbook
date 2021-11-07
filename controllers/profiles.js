import { Profile } from "../models/profile.js"
import { Post } from "../models/post.js"

function index(req, res) {
  Profile.findById(req.user.profile._id)
  .populate('followedProfiles')
  .then(profile => {
    res.render('profiles', {
      title: 'Followed Profiles',
      profile
    })
  })
}

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
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function update(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const foundId = profile.followedProfiles.findIndex(followedProfile => followedProfile.toString().includes(req.body.profileId))
    if (foundId >= 0) {
      profile.followedProfiles.splice(foundId, 1)
      console.log('Unfollowed profile')
    } else {
      profile.followedProfiles.push(req.body.profileId)
      console.log('Followed profile')
    }
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.body.profileId}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

export {
  index,
  show,
  update
}