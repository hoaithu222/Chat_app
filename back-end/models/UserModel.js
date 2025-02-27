import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Tên bắt buộc phải nhâp"],
    },
    email: {
        type: String,
        require: [true, "Email bắt buộc phải nhập"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "Mật khẩu bắt buộc phải nhập"],
    },
    refreshToken: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    profile_pic: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
});
export const UserModel = mongoose.model('User', userSchema);
