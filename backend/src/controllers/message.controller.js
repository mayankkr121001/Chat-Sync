import { Message } from '../models/message.model.js'

const getChatsOfChatRoom = async (req, res) => {
    try {
        const userId = req.user?._id;
        const { chatRoomId } = req.query;

        if (!chatRoomId) {
            return res.status(400).json({ error: "chatRoomId is missing !" })
        }

        const allChats = await Message.find({chatRoom: chatRoomId});

        if (!allChats) {
            return res.status(404).json({ error: "No chats found !" })
        }

        return res.status(200).json({
            message: "Messages found successfully",
            allChats: allChats,
        })

    } catch (error) {
        return res.status(500).json({ error: "catch error", message: error.message })
    }
}

export { getChatsOfChatRoom }