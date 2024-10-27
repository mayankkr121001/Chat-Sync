import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { app } from '../app.js';
const server = http.createServer(app);
import { Message } from '../models/message.model.js';
import { User } from '../models/user.model.js';
import { ChatRoom } from '../models/chatRoom.model.js';
import jwt from 'jsonwebtoken'
import {uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs'

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
})

io.use((socket, next) => {
  const accesstoken = socket.request.headers.cookie?.split('; ').find(row => row.startsWith('accessToken')).split('=')[1]
  // console.log(accesstoken);


  if (!accesstoken) {
    return next(new Error('Unauthorized'));
  }

  jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return next(new Error('Unauthorized'));
    }

    socket.user = await User.findById(decoded._id);
    next();
  });
});

io.on("connection", async (socket) => {
  console.log("User Connected", socket.id);

  // console.log(socket.user?._id);
  const userId = socket.user?._id;

  const chatRooms = await ChatRoom.find({ users: userId });

  chatRooms.forEach(room => {
    socket.join(room._id.toString());
    // console.log(`User ${userId} joined room ${room._id}`);

  })


  socket.on('sendMessage', async ({ textInput, type, userId, chatRoomId }) => {


    const newMessage = await Message.create({
      content: textInput,
      type: type,
      sender: userId,
      chatRoom: chatRoomId
    })
    // console.log(chatRoomId);

    await ChatRoom.findByIdAndUpdate(
      chatRoomId,
      {
        $push: {
          messages: newMessage._id
        }
      }
    )


    io.to(chatRoomId).emit('receiveMessage', {
      message: textInput,
      senderId: userId,
      chatRoomId: chatRoomId
    })
  })

  socket.on('file-send', async ({ file, filename, type, userId, chatRoomId }) => {

    const buffer = Buffer.from(new Uint8Array(file));

    const filePath = `./public/temp2/${filename}`;
    fs.writeFileSync(filePath, buffer);

    const  result = await uploadOnCloudinary(filePath)

    // console.log(result?.secure_url);  

    const newMessage = await Message.create({
      content: result?.secure_url,
      type: type,
      sender: userId,
      chatRoom: chatRoomId
    })

    await ChatRoom.findByIdAndUpdate(
      chatRoomId,
      {
        $push: {
          messages: newMessage._id
        }
      }
    )

    io.to(chatRoomId).emit('file-receive', {
      message: newMessage.content,
      senderId: userId,
      chatRoomId: chatRoomId
    })



  })



  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  })
})


export { server } 