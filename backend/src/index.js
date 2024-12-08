import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

const port = process.env.PORT;

import authRoutes from '../routes/auth.routes.js'
import { connectDb } from '../lib/db.js';

app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})