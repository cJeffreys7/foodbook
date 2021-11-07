import { Router } from 'express'
import * as postsCtrl from '../controllers/posts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/posts - GET
router.get('/', isLoggedIn, postsCtrl.index)

// localhost:3000/posts/:id/favorites - GET
router.get('/:id/favorites', isLoggedIn, postsCtrl.indexFavorites)

// localhost:3000/posts/new - GET
router.get('/new', isLoggedIn, postsCtrl.new)

// localhost:3000/posts - POST
router.post('/', isLoggedIn, postsCtrl.create)

export {
  router
}