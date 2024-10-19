import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import {server} from './socket/socket.js'

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    server.listen(PORT, ()=>{
        console.log(`Server is running at port: ${PORT}`);
    })
})
.catch(error => {
    console.log("MongoDB connection failed!", error);
})
