

import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: "",
    },
    videoUrl: {
        type: String,
        default: "",
    },
    seen: {
        type: Boolean,
        default: false
    },
    msgByUserId: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'User',
    }
}, {
    timestamps: true
})

export const MessageModel = mongoose.model('Message', messageSchema);