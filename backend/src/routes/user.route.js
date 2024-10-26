import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    refreshAccessToken,
    authorizedUser,
    uploadProfileImage,
    deleteProfileImage,
    updateName,
    addStory,
    deleteStory,
    storySeen,
    getStoriesfromOthers,
    getAllUsers
} from "../controllers/user.controller.js";

const router = Router();


router.route('/register').post(registerUser)
router.route('/verify-email').get(verifyEmail)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/refreshAccessToken').post(refreshAccessToken)
router.route('/authUser').get(verifyJWT, authorizedUser)
router.route('/uploadProfileImage').post(verifyJWT, upload.single('profileImage'), uploadProfileImage)
router.route('/deleteProfileImage').delete(verifyJWT, deleteProfileImage)
router.route('/updateName').put(verifyJWT, updateName)
router.route('/addStory').post(verifyJWT, upload.single('story'), addStory)
router.route('/deleteStory').delete(verifyJWT, deleteStory)
router.route('/storySeen').put(verifyJWT, storySeen)
router.route('/usersStories').get(verifyJWT, getStoriesfromOthers)
router.route('/getAllUsers').get(verifyJWT, getAllUsers)


export default router  