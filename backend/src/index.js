import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'

const app = express()

const port = process.env.PORT;


app.use(express.json())
app.use(cookieParser());

import authRoutes from '../routes/auth.routes.js'
import messageRoutes from '../routes/messages.routes.js'
import { connectDb } from '../lib/db.js';

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})