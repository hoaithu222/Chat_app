import express from 'express';
import { Server } from "socket.io";
import http from "http";
import getUserDetailWithToken from '../helpers/getUserDetailWithToken.js';
import { UserModel } from '../models/UserModel.js';
import { ConversationModel } from '../models/Conversation.js';
import { MessageModel } from '../models/Message.js';
import getConversation from '../helpers/getConversation.js';


const app = express();

/*
socket connection
*/
export const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
        credentials: true,

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
    socket.join(user?._id?.toString());
    onlineUser.add(user?._id?.toString());
    io.emit('online user', Array.from(onlineUser));
    socket.on('message page', async (userId) => {
        console.log("userid", userId);
        const userDetails = await UserModel.findById(userId).select("-password -refreshToken");
        const payload = {
            _id: userDetails._id,
            name: userDetails.name,
            profile_pic: userDetails.profile_pic,
            email: userDetails.email,
            online: onlineUser.has(userId.toString()),

        }
        socket.emit('message user', payload)
        //get  previous message : 
        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: userId },
                { sender: userId, receiver: user?._id }
            ]
        }).populate('message').sort({ updateAt: -1 })

        socket.emit('message', getConversationMessage?.message)
    })


    // new message
    socket.on('new message', async (data) => {
        //check conversation is available both user
        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        });

        if (!conversation) {
            const createConversation = await ConversationModel({
                sender: data?.sender,
                receiver: data?.receiver
            })
            conversation = await createConversation.save();

        }
        const message = await MessageModel({
            text: data.text,
            imageUrl: data.imageUrl,
            videoUrl: data.videoUrl,
            msgByUserId: data?.msgByUserId,
        });
        const saveMessage = await message.save();
        const updateConversation = await ConversationModel.updateOne({
            _id: conversation?._id,
        }, {
            "$push": {
                message: saveMessage?._id
            }
        });
        const getConversationMessage = await ConversationModel.findOne({
            "$or": [
                { sender: data?.sender, receiver: data?.receiver },
                { sender: data?.receiver, receiver: data?.sender }
            ]
        }).populate('message').sort({ updateAt: -1 })
        io.to(data?.sender).emit('message', getConversationMessage?.message || [])
        io.to(data?.receiver).emit('message', getConversationMessage?.message || [])
        //send conversation
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation', conversationSender)
        io.to(data?.receiver).emit('conversation', conversationReceiver)

    })
    //listConversation 
    socket.on("listConversation", async (userId) => {
        console.log("currentID", userId)
        const conversation = await getConversation(userId);
        socket.emit('conversation', conversation);

    })
    socket.on('seen', async (otherUserId) => {
        console.log("sjkakjajk", otherUserId)

        let conversation = await ConversationModel.findOne({
            "$or": [
                { sender: user?._id, receiver: otherUserId },
                { sender: otherUserId, receiver: user?._id }
            ]
        })

        const conversationMessageId = conversation?.message || []

        // Use await here to ensure the update completes before proceeding
        await MessageModel.updateMany(
            { _id: { "$in": conversationMessageId }, msgByUserId: otherUserId },
            { "$set": { seen: true } }
        )

        // Wait a small amount of time to ensure MongoDB has updated (optional)
        // await new Promise(resolve => setTimeout(resolve, 100));

        //send conversation
        const conversationSender = await getConversation(user?._id?.toString())
        const conversationReceiver = await getConversation(otherUserId)

        io.to(user?._id?.toString()).emit('conversation', conversationSender)
        io.to(otherUserId).emit('conversation', conversationReceiver)
    })
    //disconnect
    socket.on('disconnect', () => {
        if (user?._id) {
            onlineUser.delete(user._id.toString());
            io.emit('online user', Array.from(onlineUser));
        }
        console.log("Người dùng ngắt kết nối:", socket.id);
    })
})
export { app };