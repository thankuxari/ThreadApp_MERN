import express from 'express';
import multer from 'multer';
import {
    signUpUser,
    loginUser,
    logoutUser,
    followUnFollowUser,
    updateUser,
    getUserProfile,
    getSuggestedUsers,
} from '../controllers/user.controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const userRouter = express.Router();

const upload = multer({ dest: 'uploads/' });

userRouter.get('/profile/:query', getUserProfile);
userRouter.post('/signup', signUpUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/follow/:id', protectRoutes, followUnFollowUser);
userRouter.post(
    '/update_user/:id',
    protectRoutes,
    upload.single('profilePic'),
    updateUser
);
userRouter.get('/suggested_users', protectRoutes, getSuggestedUsers);

export default userRouter;
