import express from 'express';
import {
    createPost,
    getPosts,
    deletePost,
    likeUnLikePost,
    replyToPost,
    getFeed,
    getUserPosts,
    deleteComment,
    // likeUnLikeComment,
} from '../controllers/post.controller.js';
import protectRoutes from '../middleware/protectRoutes.js';

const postRouter = express.Router();

postRouter.get('/feed', protectRoutes, getFeed);
postRouter.get('/:id', getPosts);
postRouter.get('/user/:username', getUserPosts);
postRouter.post('/create_post', protectRoutes, createPost);
postRouter.delete('/delete_post/:id', protectRoutes, deletePost);
postRouter.post('/like/:id', protectRoutes, likeUnLikePost);
postRouter.put('/delete_comment/:id', protectRoutes, deleteComment);
// postRouter.post('/like_comment/:id', protectRoutes, likeUnLikeComment);
postRouter.post('/reply/:id', protectRoutes, replyToPost);

export default postRouter;
