import { UserModel } from "../../models/UserModel.js";

export default async function updateUserDetails(request, res) {
    try {
        const userId = request.userId;
        if (!userId) {
            return res.status(401).json({
                message: `Không có user với id ${userId}`,
                error: true,
                success: false,
            })
        }
        const { name, profile_pic, bio, cover_photo } = request.body;
        const updateUser = await UserModel.updateOne({
            _id: userId
        }, {
            name,
            profile_pic,
            bio,
            cover_photo
        })
        const userInfo = await UserModel.findOne({ _id: userId });
        return res.status(201).json({
            message: "Cập nhật thông tin thành công",
            error: false,
            success: true,
            data: userInfo,
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true
        });
    }
}