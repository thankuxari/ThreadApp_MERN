import express, { Router } from 'express';
import mongoose from 'mongoose';
import colors from 'colors';
import userRouter from './routers/user.routers.js';
import postRouter from './routers/post.router.js';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const PORT = process.env.PORT || 8000;

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

app.listen(PORT, (req, res) => {
	connectDB();
	console.log(`Server running on port ${PORT}`.green.bold);
});
