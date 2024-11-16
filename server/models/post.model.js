import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
	{
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		postText: {
			type: String,
			required: true,
			maxLength: 100,
		},
		postImage: {
			type: String,
			default: '',
		},
		likes: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'User',
			default: [],
		},
		replies: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				text: {
					type: String,
					required: true,
					maxLength: 100,
				},
				userProfilePic: {
					type: String,
					default: '',
				},
				username: {
					type: String,
				},
				repliesLikes: {
					type: [mongoose.Schema.Types.ObjectId],
					ref: 'User',
					default: [],
				},
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
			},
		],
	},
	{ timestamps: true }
);

const postModel = mongoose.model('Post', postSchema);

export default postModel;
