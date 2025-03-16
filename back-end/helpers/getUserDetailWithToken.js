import jwt from "jsonwebtoken"
import { UserModel } from "../models/UserModel.js"

export default async function getUserDetailWithToken(token) {
    try {
        if (!token) {
            return {
                message: "session out",
                logout: true,
            }
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await UserModel.findById(decode.id).select('-password -refreshToken');
        return user;

    } catch (error) {
        return {
            message: error.message,
            error: true,
        }
    }


}