import express from 'express';
import { Server } from "socket.io";
import http from "http";
import getUserDetailWithToken from '../helpers/getUserDetailWithToken.js';
import { UserModel } from '../models/UserModel.js';


const app = express();

/*
socket connection

*/
export const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    }
})

/*
socket running at http://localhost:8080

*/
const onlineUser = new Set();
io.on('connection', async (socket) => {
    console.log("connect user", socket.id);
    const token = socket.handshake.auth.token;
    // current user details 
    const user = await getUserDetailWithToken(token);
    socket.join(user?._id);
    onlineUser.add(user._id);
    io.emit('onlineUser', Array.from(onlineUser));
    socket.on('message page', async (userId) => {
        console.log("userid", userId);
        const userDetails = await UserModel.findById(userId).select("-password -refreshToken");
        const payload = {
            _id: userDetails._id,
            name: userDetails.name,
            profile_pic: userDetails.profile_pic,
            email: userDetails.email,
            online: onlineUser.has(userId),
        }
        socket.emit('message user', payload)
    })
    //disconnect
    socket.on('disconnect', () => {
        onlineUser.delete(user._id)
        console.log("disconnect user", socket.id)
    })
})
export { app };