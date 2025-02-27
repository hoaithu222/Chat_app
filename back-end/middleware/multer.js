import multer from "multer";

const storage = multer.memoryStorage(); // Lưu file vào bộ nhớ thay vì ổ đĩa

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // Giới hạn file 100MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
            cb(null, true);
        } else {
            cb(new Error("Chỉ hỗ trợ upload ảnh và video"), false);
        }
    },
});

export default upload;
