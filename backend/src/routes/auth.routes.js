import express from 'express'

const router = express.Router()

router.post('/signup', (req, res) => {
    res.send("Signup Route")
})

router.post('/signin', (req, res) => {
    res.send("Signin Route")
})

router.post('/logout', (req, res) => {
    res.send("Logout Route")
})


export default router