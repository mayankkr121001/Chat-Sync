    import { Router } from "express";
    import { registerUser, verifyEmail, loginUser, logoutUser, refreshAccessToken, authorizedUser } from "../controllers/user.controller.js";
    import { verifyJWT } from "../middlewares/auth.middleware.js";

    const router = Router();


    router.route('/register').post(registerUser)
    router.route('/verify-email').get(verifyEmail)
    router.route('/login').post(loginUser)
    router.route('/logout').post(verifyJWT, logoutUser)
    router.route('/refreshAccessToken').post(refreshAccessToken)
    router.route('/authUser').get(verifyJWT, authorizedUser)


    export default router  