import mongoose from "mongoose";

const friendsSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'User',
    },
    friend_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "blocked"],
        default: "pending"
    }
}, {
    timestamps: true
})
export const FriendsModel = mongoose.model('Friends', friendsSchema);

