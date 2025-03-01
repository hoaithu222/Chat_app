import { UserModel } from "../../models/UserModel.js";

export default async function searchUser(req, res) {
    try {
        const { search } = req.body;

        let users;
        if (!search || search.trim() === "") {

            users = await UserModel.find().sort({ createdAt: -1 }).limit(20);
        } else {

            const query = new RegExp(search, "i");
            users = await UserModel.find({
                $or: [
                    { name: query },
                    { email: query }
                ]
            }).limit(20);
        }

        return res.status(200).json({
            message: "Lấy danh sách user thành công",
            data: users,
            success: true
        });
    } catch (error) {
        console.error("Search user error:", error);
        return res.status(500).json({
            message: error.message || "Lỗi server khi tìm kiếm người dùng",
            success: false,
            error: true
        });
    }
}
