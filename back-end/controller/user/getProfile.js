import { UserModel } from "../../models/UserModel.js";


export default async function getProfile(request, response) {
    try {
        const userId = request.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return response.status(400).json({
                message: "Lỗi khi lấy thông tin user",
                error: true,
                success: false,
            })
        }
        return response.status(200).json({
            message: "Đã lấy thông tin user thành công",
            error: false,
            success: true,
            data: user,
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
        })
    }
}
