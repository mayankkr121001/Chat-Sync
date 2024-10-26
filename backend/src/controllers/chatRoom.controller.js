import mongoose from "mongoose";
import { ChatRoom } from "../models/chatRoom.model.js";
import { User } from "../models/user.model.js";

const createRoom = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { otherUserId } = req.body;

        if (!otherUserId || otherUserId.trim() === "") {
            return res.status(400).json({ error: "otherUserId is missing !" })
        }

        const roomalreadyExist = await ChatRoom.find({
            users: { $all: [userId, otherUserId] }
        })

        if (roomalreadyExist.length > 0) {
            return res.status(200).json({ message: "Room already exist !" })
        }

        const usersArray = [userId, otherUserId];

        const room = await ChatRoom.create({
            users: usersArray
        })

        if (!room) {
            return res.status(400).json({ error: "There is some problem creating the room !" })
        }

        return res.status(200).json({
            message: "Room with users created successfully",
            room: room
        })

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const connectedUsers = async (req, res) => {
    try {
        const userId = req.user?._id;

        const allUsersChatRoom = await ChatRoom.find(
            { users: { $in: [userId] } }
        )

        if (allUsersChatRoom.length === 0) {
            return res.status(200).json({ message: "No Room exists !" })
        }

        let otherConnectedUsers =[];
        
        for(const user of allUsersChatRoom){
            
            if(new mongoose.Types.ObjectId(user.users[0]).equals(userId)){       
                // console.log("id match");
                const otherUser = await User.findById(user.users[1]) 
                otherConnectedUsers.push(otherUser);
            }
            else if(new mongoose.Types.ObjectId(user.users[1]).equals(userId)){
                const otherUser = await User.findById(user.users[0]) 
                otherConnectedUsers.push(otherUser);
            }
            
        }
        // console.log(otherConnectedUsers);
        if (otherConnectedUsers.length === 0) {
            return res.status(200).json({ message: "No Connected user !" })
        }

        return res.status(200).json({
            message: "Connected users found successfully.",
            otherConnectedUsers: otherConnectedUsers
        })
        

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

const getRoomByUsers = async (req, res)=>{
    try {
        const userId = req.user?._id;
        const { otherUserId } = req.query;
        // console.log(otherUserId);
        

        if (!otherUserId || otherUserId.trim() === "") {
            return res.status(400).json({ error: "otherUserId is missing !" })
        }

        const roomalreadyExist = await ChatRoom.find({
            users: { $all: [userId, otherUserId] }
        })

        if(roomalreadyExist.length === 0){
            return res.status(400).json({ error: "ChatRoom is missing !" })
        }

        return res.status(200).json({
            message: "Room sent successfully",
            chatRoom: roomalreadyExist
        })

        
    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
} 

export { createRoom ,connectedUsers, getRoomByUsers }; 