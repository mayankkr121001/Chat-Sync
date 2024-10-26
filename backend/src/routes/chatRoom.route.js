import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { 
    createRoom,
    connectedUsers,
    getRoomByUsers
 } from "../controllers/chatRoom.controller.js";


const router = Router();

router.route('/createRoom').post(verifyJWT, createRoom);
router.route('/connectedUsers').get(verifyJWT, connectedUsers);
router.route('/getRoom').get(verifyJWT, getRoomByUsers)

export default router
