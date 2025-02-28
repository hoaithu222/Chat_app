import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
    follower_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'User',
    },
    following_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "User",
    },

}, {
    timestamps: true
})
export const FollowerModel = mongoose.model('Followers', followerSchema);

