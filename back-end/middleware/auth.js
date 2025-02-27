import jwt from "jsonwebtoken";

const auth = (request, response, next) => {
    try {
        const token = request.headers.authorization?.split(" ")[1] || request.cookies.accessToken;
        if (!token) {
            return response.status(401).json({
                message: "Không có token, vui lòng đăng nhập",
                error: true,
                success: false,
            });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return response.status(401).json({
                        message: "Token đã hết hạn, vui lòng đăng nhập lại",
                        error: true,
                        success: false,
                    });
                } else {
                    return response.status(401).json({
                        message: "Token không hợp lệ",
                        error: true,
                        success: false,
                    });
                }
            }

            request.userId = decoded.id;
            next();
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message,
            error: true,
            success: false,
        });
    }
};


export default auth;