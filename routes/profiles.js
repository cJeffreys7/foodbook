import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// localhost:3000/profiles/:id - GET
router.get('/:id', profilesCtrl.show)

// localhost:3000/profiles/:id - PATCH
router.patch('/:id', isLoggedIn,profilesCtrl.update)

export {
  router
}