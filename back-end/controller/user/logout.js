import { UserModel } from "../../models/UserModel.js";

export default async function logout(request, response) {
    try {
        const { refreshToken } = request.body;


        if (!refreshToken) {
            return response.status(400).json({
                message: "Không có refresh token",
                error: true,
                success: false,
            });
        }

        const user = await UserModel.findOne({ refreshToken });
        if (!user) {
            return response.status(403).json({
                message: "Refresh token không hợp lệ",
                error: true,
                success: false,
            });
        }

        user.refreshToken = null;
        await user.save();

        return response.status(200).json({
            message: "Đăng xuất thành công",
            error: false,
            success: true,
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Lỗi server",
            error: true,
            success: false,
        });
    }
}


