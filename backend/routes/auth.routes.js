import express from 'express'
import { checkAuth, signin, signout, signup, upadteProfile } from '../controllers/auth.controllers.js'
import { protectedRoute } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post("/signup", signup)

router.post("/signin", signin)

router.post("/signout", signout)

router.put("/update-profile", protectedRoute ,upadteProfile)

router.post("/check", protectedRoute, checkAuth)

export default router