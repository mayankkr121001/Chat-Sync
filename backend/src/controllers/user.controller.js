import { User } from "../models/user.model.js";
import { generateAccessRefreshToken } from "../utils/generateTokens.js";
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (
            [name, email, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({ error: "All fields are required." })
        }

        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ error: "User with email already exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let verificationToken = '';
        for (let i = 1; i <= 6; i++) {
            let random = Math.floor(Math.random() * 10);
            verificationToken += random.toString();
        }

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken
        })
        const createdUser = await User.findById(user._id).select("-password -refreshToken -verificationToken");

        if (!createdUser) {
            return res.status(500).json({ error: "Something went wrong while creating the user." });
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.EMAIL_APP_PASSWORD, // Your email password
            }
        })
        const url = `${process.env.CORS_ORIGIN}/verify-email?token=${verificationToken}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verification',
            text: `Click this link to verify your email: ${url}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: "Error sending email" })
            }
            return res.status(201).json({ message: 'Registration successful! Please check your email to verify your account.' });
        })

        return res.status(201).json({
            message: "User registered Successfully",
            createdUser
        })

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query
        const user = await User.findOne({ verificationToken: token })

        if (!user) {
            return res.status(400).json({ error: "Invalid token" })
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();
        return res.status(200).json({ message: 'Email verified Successfully' })

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            [email, password].some((field) => field?.trim() === "")
        ) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "No user found! Please register" })
        }
        if (!(user?.isVerified)) {
            return res.status(401).json({ error: "Email not verified yet! Please verify email" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Password is incorrect !" })
        }

        const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        if (!loggedInUser) {
            return res.status(404).json({ error: "Something went wrong while login the user !" })
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged In successfully.",
                loggedInUser
            })


    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}


const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $unset: {
                refreshToken: 1
            }
        }, { new: true })

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        return res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .send("User logout successfully.")

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}


const refreshAccessToken = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({ error: "Unauthorized request !" })
        }

        const decodedPayload = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedPayload._id)

        if (!user) {
            return res.status(401).json({ error: "Inavalid refresh token !" })
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({ error: "Refresh token is expired or used!" })
        }

        const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .send("Access Token refreshed");

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const authorizedUser = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(401).json({ error: "User is not Authorized !" })
        }

        return res.status(200)
            .json({
                message: "User is authorized",
                isAuthorized: true,
                user,
            })

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}


const uploadProfileImage = async (req, res) => {
    try {
        const profileImageLocalPath = req.file?.path;

        if (!profileImageLocalPath) {
            return res.status(400).json({ error: "Profile image is missing !" });
        }

        const profileImage = await uploadOnCloudinary(profileImageLocalPath);

        if (!profileImage.url) {
            return res.status(400).json({ error: "Error while uploading profile image !" });
        }

        const user = await User.findById(req.user?._id);

        if (!user) {
            return res.status(400).json({ error: "User not found !" });
        }

        if (user.profileImage) {
            const publicId = user.profileImage.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        }


        await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    profileImage: profileImage.url
                }
            }, { new: true }
        )


        return res.status(200).json({
            message: "Profile Image updated successfully."
        })
    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }

}

const deleteProfileImage = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id);

        if (!user) {
            return res.status(400).json({ error: "User not found !" });
        }

        if (!user.profileImage) {
            return res.status(400).json({ error: "No profile image to delete !" });
        }

        const publicId = user.profileImage.split('/').pop().split('.')[0];

        const deleteResult = await deleteFromCloudinary(publicId);

        if (deleteResult.result !== 'ok') {
            return res.status(500).json({ error: "Failed to delete profile image from Cloudinary !" });
        }

        await User.findByIdAndUpdate(
            req.user?._id,
            {
                $unset: {
                    profileImage: 1
                }
            },
            { new: true }
        )

        return res.status(200).json({
            message: "Profile image deleted successfully."
        })


    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const updateName = async(req, res)=>{
    try {
        const {name} = req.body;

        if(!name){
            return res.status(400).json({ error: "Name is required !" });
        }
        
        const user = await User.findById(req.user?._id);
        
        if(!user){
            return res.status(400).json({ error: "User not found !" });
        }


        user.name = name
        await user.save()

        return res.status(200).json({
            message: "Name changed successfully."
        })



    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const addStory = async (req, res)=>{
    try {
        const storyLocalPath = req.file?.path;

        if(!storyLocalPath){
            return res.status(400).json({ error: "Story is missing !" });
        }

        const user = await User.findById(req.user?._id);
        if(!user){
            return res.status(400).json({ error: "User not found !" });
        }

        if (user.story) {
            const publicId = user.story.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        }

        const story  = await uploadOnCloudinary(storyLocalPath);

        if (!story.url) {
            return res.status(400).json({ error: "Error while uploading story !" });
        }

        user.story = story.url;
        user.storyCreatedTime = Date.now()
        await user.save();

        return res.status(200).json({
            message: "Story uploaded successfully."
        })


    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const storySeen = async(req,res)=>{
    try {
        const user = await User.findById(req.user?._id);

        if(!user){
            return res.status(400).json({ error: "User not found !" });
        }

        user.storySeen = true;
        await user.save();

        return res.status(200).json({
            message: "Set story seen to true successfully."
        })
        
    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const getStoriesfromOthers = async (req, res)=>{
    try {
        const userId = req.user?._id;
        const usersWithStories = await User.find ({
            story: {$exists: true},
            _id: { $ne:  userId }
        });

        if(!usersWithStories){
            return res.status(400).json({ error: "No user with stories !" });
        }

        return res.status(200).json({
            message: "User with stories found successfully.",
            usersWithStories: usersWithStories
        })
    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const getAllUsers = async (req, res)=>{
    try {
        const userId = req.user?._id;
        const allUsers = await User.find({
            isVerified: true,
            _id : {$ne : userId}
        });

        if(!allUsers){
            return res.status(400).json({ error: "No users found !" });
        }

        return res.status(200).json({
            message: "All users found successfully.",
            allUsers: allUsers
        })
        
    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

export {
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
    storySeen,
    getStoriesfromOthers,
    getAllUsers
}