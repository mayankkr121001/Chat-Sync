import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    getChatsOfChatRoom,
} from '../controllers/message.controller.js'

const router = Router()

router.route('/getChats').get(verifyJWT, getChatsOfChatRoom)


export default router   