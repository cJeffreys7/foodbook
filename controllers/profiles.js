import { Profile } from "../models/profile.js"

function show(req, res) {
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('profiles/show', {
      title: 'Show Profile',
      profile
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