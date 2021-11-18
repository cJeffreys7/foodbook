import { Profile } from "../models/profile.js"
import { Post } from "../models/post.js"
import platform from 'platform'

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

function toggleFollowing(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const foundId = profile.followedProfiles.findIndex(followedProfile => followedProfile.toString().includes(req.body.profileId))
    if (foundId >= 0) {
      profile.followedProfiles.splice(foundId, 1)
    } else {
      profile.followedProfiles.push(req.body.profileId)
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

function toggleFavorite(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    const foundId = profile.favoritePosts.findIndex(favoritePost => favoritePost.toString().includes(req.body.postId))
    if (foundId >= 0) {
      profile.favoritePosts.splice(foundId, 1)
    } else {
      profile.favoritePosts.push(req.body.postId)
    }
    profile.save()
    .then(() => {
      Post.findById(req.body.postId)
      .then(post => {
        const foundPostFavId = post.favorites.findIndex(favorite => favorite.toString().includes(req.user.profile._id))
        if (foundPostFavId >= 0) {
          post.favorites.splice(foundPostFavId, 1)
        } else {
          post.favorites.push(req.user.profile._id)
        }
        post.save()
        console.log(`You are using ${platform.name} on a ${platform.product} product using ${platform.manugacturer || 'unknown vendor'} manufacturer`)
        res.status(200).send(`You are using ${platform.name} on a ${platform.product} product using ${platform.manugacturer || 'unknown vendor'} manufacturer`)
      })
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
  toggleFollowing,
  toggleFavorite
}