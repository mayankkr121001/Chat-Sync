import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'
import UserRouter from './routes/user.route.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


const server = http.createServer(app);
const io = new Server(server)

app.use('/api/v1/user', UserRouter)

export {app, server} 