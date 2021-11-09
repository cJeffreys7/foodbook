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

// localhost:3000/posts/:id/edit - GET
router.get('/:id/edit', isLoggedIn, postsCtrl.edit)

// localhost:3000/posts - POST
router.post('/', isLoggedIn, postsCtrl.create)

// localhost:3000/posts/:id/comments - POST
router.post('/:id/comments', isLoggedIn, postsCtrl.createComment)

// localhost:3000/posts/:id - PATCH
router.patch('/:id', isLoggedIn, postsCtrl.update)

// localhost:3000/posts/:id/comments/:commentId - PATCH
router.patch('/:id/comments/:commentId', isLoggedIn, postsCtrl.updateComment)

// localhost:3000/posts/:id/toggleLike - PATCH
router.patch('/:id/toggleLike', isLoggedIn, postsCtrl.toggleLike)

// localhost:3000/posts/:id/comments/:commentId/toggleLike - PATCH
router.patch('/:id/comments/:commentId/toggleLike', isLoggedIn, postsCtrl.toggleCommentLike)

// localhost:3000/posts/:id - DELETE
router.delete('/:id', isLoggedIn, postsCtrl.delete)

// localhost:3000/posts/:id/comments/:commentId - DELETE
router.delete('/:id/comments/:commentId', isLoggedIn, postsCtrl.deleteComment)

export {
  router
}