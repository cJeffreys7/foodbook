import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/profiles - GET
router.get('/', profilesCtrl.index)

// localhost:3000/profiles/:id - GET
router.get('/:id', profilesCtrl.show)

// localhost:3000/profiles/:id/toggleFollowing - PATCH
router.patch('/:id/toggleFollowing', isLoggedIn,profilesCtrl.toggleFollowing)

// localhost:3000/profiles/:id/toggleFavorite - PATCH
router.patch('/:id/toggleFavorite', profilesCtrl.toggleFavorite)

export {
  router
}