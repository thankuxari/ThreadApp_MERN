import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import colors from 'colors';
import userRouter from './routers/user.routers.js';
import postRouter from './routers/post.router.js';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
const __dirname = path.resolve();
console.log('Loading .env file from:', path.resolve(__dirname, '.env'));
dotenv.config();
console.log('Port from .env:', process.env.PORT);

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

app.listen(process.env.PORT, (req, res) => {
    connectDB();
    console.log(`Server running on port ${process.env.PORT}`.green.bold);
});
