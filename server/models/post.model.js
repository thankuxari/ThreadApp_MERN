import mongoose from 'mongoose';

const postSchema = new mongooseSchema(
	{
		postedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		postTitle: {
			type: String,
			required: true,
			maxLength: 100,
		},
		postImage: {
			type: Buffer,
			default: '',
			required: false,
		},
		likes: {
			type: Number,
			default: 0,
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
					type: Buffer,
				},
				username: {
					type: String,
				},
				repliesLikes: {
					type: Number,
					default: 0,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

const postModel = mongoose.model('Post', postSchema);

export default postModel;
