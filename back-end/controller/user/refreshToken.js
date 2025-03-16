import { UserModel } from "../../models/UserModel.js";
import jwt from "jsonwebtoken"

export default async function refreshToken(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1];


        if (!refreshToken) {
            return response.status(401).json({
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

        jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return response.status(403).json({
                    message: "Refresh token không hợp lệ hoặc đã hết hạn",
                    error: true,
                    success: false,
                });
            }


            const newAccessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });

            return response.status(200).json({
                message: "Tạo access token mới thành công",
                error: false,
                success: true,
                accessToken: newAccessToken,
            });
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "Lỗi server",
            error: true,
            success: false,
        });
    }
}


