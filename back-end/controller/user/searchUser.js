import { UserModel } from "../../models/UserModel.js";

export default async function searchUser(req, res) {
    try {
        const { search } = req.body;
        const query = new RegExp(search, "i", "g");
        const user = await UserModel.find({
            "or": [
                {
                    name: query,
                    email: query,
                }
            ]
        });
        return res.status(200).json({
            message: "Lấy danh sách user thành công",
            data: user,
            success: true
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true
        })
    }
}