
import bcryptjs from "bcryptjs";
import { UserModel } from "../../models/UserModel.js";

export default async function registerUser(request, response) {
    try {
        const { name, email, password, profile_pic } = request.body;
        const checkEmail = await UserModel.findOne({
            email
        });
        if (checkEmail) {
            return response.status(400).json({
                message: "Tài khoản đã tồn tại",
                error: true,
                success: false,
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const payload = {
            name, email, profile_pic, password: hashPassword
        }
        const user = new UserModel(payload);
        const userSave = await user.save();
        return response.status(201).json({
            message: "Đã tạo tài khoản thành công",
            error: false,
            success: true,
            data: userSave,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

