import express from 'express'

const port = 5000
const app = express()


import authRoutes from './routes/auth.routes.js'

app.use("/api/auth", authRoutes)


app.listen(port , () => {
    console.log("Server is running on port 5000")
})