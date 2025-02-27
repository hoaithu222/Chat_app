import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import router from './router/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router);

app.get('/', (req, res) => {
    res.json({
        message: "Hello message_chat hoai thu",
    });
});

// Kết nối DB và export handler thay vì chạy trực tiếp
export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}
