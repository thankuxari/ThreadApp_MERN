import postModel from '../models/post.model.js';
import userModel from '../models/user.model.js';

async function getPosts(req, res) {
	const postId = req.params.id;

	try {
		const post = await postModel.findById(postId);

		if (!post) return res.status(400).json({ message: 'Post not found' });

		return res.status(200).json(post);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}
async function createPost(req, res) {
	const { postText, postImage } = req.body;
	const userId = req.userId;

	const textMaxLength = 500;

	try {
		const userPostedBy = await userModel.findById(userId);

		if (!userPostedBy)
			return res
				.status(400)
				.json({ message: 'You must be logged in to create a post' });

		if (!postText)
			return res.status(400).json({ message: 'All fields are required' });

		if (postText.length > textMaxLength)
			return res.status(400).json({
				message: `Post text must be less than ${textMaxLength} characters`,
			});

		const newPost = await postModel.create({
			postedBy: userId,
			postText,
			postImage: postImage || '',
		});

		return res
			.status(200)
			.json({ message: 'Post created successfully', newPost });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function deletePost(req, res) {
	const postId = req.params.id;
	const userId = req.userId;
	try {
		const post = await postModel.findById(postId);

		if (!post) return res.status(400).json({ message: 'Post not found' });

		const postCreator = await userModel.findById(userId);

		if (!postCreator)
			return res.status(400).json({ message: 'User not found' });

		if (post.postedBy.toString() !== userId.toString())
			return res.status(400).json({
				message: 'You dont have permission to delete this post',
			});

		await postModel.findByIdAndDelete(postId);

		return res.status(200).json({ message: 'Post deleted successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function likeUnLikePost(req, res) {
	const postId = req.params.id;
	const userId = req.userId;

	try {
		const post = await postModel.findById(postId);

		if (!post) return res.status(400).json({ message: 'Post not found' });

		const user = await userModel.findById(userId);

		if (!user) return res.status(400).json({ message: 'User not found' });

		const isLiked = post.likes.includes(userId);

		if (isLiked) {
			await postModel.findByIdAndUpdate(postId, {
				$pull: { likes: userId },
			});
			return res
				.status(200)
				.json({ message: 'Post unliked successfully' });
		} else {
			await postModel.findByIdAndUpdate(postId, {
				$push: { likes: userId },
			});
			return res.status(200).json({ message: 'Post liked successfully' });
		}
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function replyToPost(req, res) {
	const postId = req.params.id;
	const userId = req.userId;

	const { replyText } = req.body;

	try {
		const post = await postModel.findById(postId);

		if (!post) return res.status(400).json({ message: 'Post not found' });

		const user = await userModel.findById(userId);

		if (!user) return res.status(400).json({ message: 'User not found' });

		if (!replyText)
			return res.status(400).json({ message: 'All fields are required' });

		await postModel.findByIdAndUpdate(postId, {
			$push: {
				replies: [
					{
						userId,
						text: replyText,
						userProfilePic: user.profilePic || '',
						username: user.username,
					},
				],
			},
		});

		return res.status(200).json({ message: 'Reply posted successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function getFeed(req, res) {
	const userId = req.userId;

	try {
		const user = await userModel.findById(userId);

		if (!user) return res.status(400).json({ message: 'User not found' });

		const isFollowing = user.following;
		const posts = await postModel
			.find({ postedBy: { $in: isFollowing } })
			.sort({ createdAt: -1 });
		console.log(posts);
		return res.status(200).json(posts);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export {
	createPost,
	getPosts,
	deletePost,
	likeUnLikePost,
	replyToPost,
	getFeed,
};
