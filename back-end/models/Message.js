

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
    }
}, {
    timestamps: true
})

export const MessageModel = mongoose.model('Message', messageSchema);