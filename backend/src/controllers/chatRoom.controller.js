 import { ChatRoom } from "../models/chatRoom.model.js";


 const createRoom = async (req, res) =>{
    try {
        const userId = req.user?._id;
        const {otherUserId} = req.body;
        
        if(!otherUserId || otherUserId.trim() === ""){
            return res.status(400).json({error: "otherUserId is missing !"})
        }

        const roomalreadyExist = await ChatRoom.find({
            users: {$all : [userId, otherUserId]}
        })

        if(roomalreadyExist.length > 0){
            return res.status(200).json({message: "Room already exist !"})
        }

        const usersArray = [userId, otherUserId];

        const room = await ChatRoom.create({
            users: usersArray
        })

        if(!room){
            return res.status(400).json({error: "There is some problem creating the room !"})
        }

        return res.status(200).json({
            message: "Room with users created successfully",
            room: room
        })
        
    } catch (error) {
        return res.status(500).json({error: "catch error", message: error.message})   
    }
 }

 export {createRoom}; 