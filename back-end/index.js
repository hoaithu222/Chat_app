import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import router from './router/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

const PORT = process.env.PORT || 8080;

app.get('/', (request, response) => {
    response.json({
        message: "Hello message_chat hoai thu ",
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server running at" + PORT);
    });
});