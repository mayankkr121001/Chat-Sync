import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profileImage: {
            type: String
        },
        story:{
            type: String
        },
        storyCreatedTime:{
            type: Date
        },
        storySeen:{
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default : false
        },
        verificationToken: {
            type: String
        },
        refreshToken: {
            type: String
        }
    }, { timestamps: true }  
)


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}


    )
}

export const User = mongoose.model('User', userSchema);