import express from 'express';
import mutler from 'multer';
import {
	signUpUser,
	loginUser,
	logoutUser,
	followUnFollowUser,
	updateUser,
	getUserProfile,
} from '../controllers/user.controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const userRouter = express.Router();

const upload = mutler({ dest: 'uploads/' });

userRouter.get('/profile/:name', getUserProfile);
userRouter.post('/signup', signUpUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/follow/:id', protectRoutes, followUnFollowUser);
userRouter.post('/update_user/:id', protectRoutes, upload.single('profilePic') ,updateUser);

export default userRouter;
