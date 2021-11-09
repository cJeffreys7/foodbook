import { Router } from 'express'

const router = Router()

router.get('/', function (req, res) {
  if (req.user) {
    res.redirect('/posts')
  } else {
    res.render('index', { title: 'Home Page', user: null })
  }
})

export {
  router
}