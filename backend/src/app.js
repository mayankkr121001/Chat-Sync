import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import UserRouter from './routes/user.route.js'
import ChatRoomRouter from './routes/chatRoom.route.js'
import "../src/utils/cron/storySchedule.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


app.use('/api/v1/user', UserRouter)
app.use('/api/v1/chatRoom', ChatRoomRouter)

export { app } 