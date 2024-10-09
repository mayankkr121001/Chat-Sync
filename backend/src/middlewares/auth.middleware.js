import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        // console.log(token);

        if(!token){
            return res.status(401).json({ error: "Unauthorized request, token missing" });
        }

        const decodedPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedPayload._id).select("-password -refreshToken")

        if(!user){
            return res.status(401).json({ error: "Invalid access token, user not found" });
        } 

        req.user = user   
        next()
        
    } catch (error) {
        // console.error("Authentication middleware error: ", error.message);
        res.status(500).json({error: "catch error", message: "Internal Server Error" });
    }
}