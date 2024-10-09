import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
    {
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }]
    }
)

export const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema)