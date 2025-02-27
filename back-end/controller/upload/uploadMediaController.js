import uploadMedia from "../../utils/uploadMedia.js";



export default async function uploadMediaController(req, res) {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Vui lòng chọn file",
                error: true,
                success: false,
            });
        }
        const uploadResult = await uploadMedia(file);

        return res.status(200).json({
            message: "Upload thành công",
            error: false,
            success: true,
            data: uploadResult.url,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Lỗi server",
            error: true,
            success: false,
        });
    }
}
