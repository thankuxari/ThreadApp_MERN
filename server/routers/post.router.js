import express from 'express';
import mutler from 'multer';
import {
	createPost,
	getPosts,
	deletePost,
	likeUnLikePost,
	replyToPost,
	getFeed,
	getUserPosts,
} from '../controllers/post.controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const postRouter = express.Router();

const upload = mutler({ dest: 'uploads/' });

postRouter.get('/feed', protectRoutes, getFeed);
postRouter.get('/:id', getPosts);
postRouter.get('/user/:username', getUserPosts);
postRouter.post(
	'/create_post',
	protectRoutes,
	upload.single('postImage'),
	createPost
);
postRouter.delete('/delete_post/:id', protectRoutes, deletePost);
postRouter.post('/like/:id', protectRoutes, likeUnLikePost);
postRouter.post('/reply/:id', protectRoutes, replyToPost);

export default postRouter;
