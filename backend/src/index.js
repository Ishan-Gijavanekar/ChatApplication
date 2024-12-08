import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

const port = process.env.PORT;


app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

import authRoutes from '../routes/auth.routes.js'
import messageRoutes from '../routes/messages.routes.js'
import { connectDb } from '../lib/db.js';

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    connectDb()
})