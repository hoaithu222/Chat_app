import mongoose from "mongoose";



const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'User',
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'User',
    },
    message: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Message',
        }
    ]

}, {
    timestamps: true
})

export const ConversationModel = mongoose.model('Conversation', conversationSchema);
