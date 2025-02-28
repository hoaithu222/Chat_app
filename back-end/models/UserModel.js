import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Tên bắt buộc phải nhập"],
        },
        email: {
            type: String,
            required: [true, "Email bắt buộc phải nhập"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Mật khẩu bắt buộc phải nhập"],
        },
        refreshToken: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
        profile_pic: {
            type: String,
            default: "",
        },
        cover_photo: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
        },
        phone_number: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin", "moderator"],
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model("User", userSchema);
