import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createRoom } from "../controllers/chatRoom.controller.js";


const router = Router();

router.route('/createRoom').post(verifyJWT, createRoom);

export default router
