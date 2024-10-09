import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        chatRoom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRoom'
        }
    }, {timestamps: true}
)

export const Message = mongoose.model('Message', messageSchema);
