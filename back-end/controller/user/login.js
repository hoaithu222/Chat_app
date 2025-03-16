import { UserModel } from "../../models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function login(request, response) {
    try {
        const { email, password } = request.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return response.status(400).json({
                message: "Tài khoản không tồn tại, vui lòng tạo tài khoản",
                error: true,
                success: false,
            });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return response.status(400).json({
                message: "Mật khẩu không đúng",
                error: true,
                success: false,
            });
        }

        const tokenData = {
            id: user._id,
            email: user.email,
        };
        const accessToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });


        const refreshToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d',
        });

        user.refreshToken = refreshToken;
        await user.save();

        return response.status(200).json({
            message: "Đăng nhập thành công",
            error: false,
            success: true,
            accessToken,
            refreshToken,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Đã có lỗi xảy ra với server",
            error: true,
            success: false,
        });
    }
}


