function passUserToView(req, res, next) {
  // locals is similar to how we pass through object info to the view
  res.locals.user = req.user ? req.user : null
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/google')
}

export {
  passUserToView,
  isLoggedIn
}