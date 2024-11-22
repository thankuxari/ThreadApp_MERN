import express from 'express';
import path from 'path';
import userRouter from './routers/user.routers.js';
import postRouter from './routers/post.router.js';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(
	cors({
		origin: [
			'http://localhost:5000',
			'http://localhost:5173',
			'https://threadapp-mern.onrender.com/',
		],
		credentials: true,
	})
);

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/client/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
	});
}

app.listen(process.env.PORT, (req, res) => {
	connectDB();
	console.log(`Server running on port ${process.env.PORT}`.green.bold);
});
