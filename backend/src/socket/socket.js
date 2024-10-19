import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import {app} from '../app.js';
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }
})

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    // socket.on("message", (msg)=>{
    //     console.log(msg);
        
    // })

 
    // io.emit("info", "Information from server")

    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
    })
})


export { server } 