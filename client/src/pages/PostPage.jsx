import { useState, useEffect } from 'react';
import { IoIosMore } from 'react-icons/io';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { formatDistanceToNow } from 'date-fns';

function PostPage() {
	const [user, setUser] = useState(null);
	const [post, setPost] = useState(null);
	const [replyText, setReplyText] = useState('');
	const currentUser = useRecoilValue(userAtom);
	const [loading, setLoading] = useState(true);
	const { postid } = useParams();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		async function fetchPostAndUser() {
			try {
				const postResponse = await axios.get(`/api/posts/${postid}`);
				setPost(postResponse.data);

				const userResponse = await axios.get(
					`/api/users/profile/${postResponse.data.postedBy}`
				);
				setUser(userResponse.data);
			} catch (error) {
				enqueueSnackbar(
					error.response?.data?.message || 'Failed to load data',
					{ variant: 'error' }
				);
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		}

		fetchPostAndUser();
	}, [postid, enqueueSnackbar]);

	async function handlePostReply(e) {
		e.preventDefault();
		try {
			const replyResponse = await axios.post(
				`/api/posts/reply/${postid}`,
				{
					userId: currentUser.user._id,
					replyText,
				}
			);

			enqueueSnackbar(replyResponse.data.message, { variant: 'success' });
			setReplyText(''); // Clear input field
		} catch (error) {
			enqueueSnackbar(error.response?.data?.message, {
				variant: 'error',
			});
			console.error(error.message);
		}
	}

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	if (!post || !user) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>No post found</p>
			</div>
		);
	}

	return (
		<div className="p-4 max-w-2xl mx-auto">
			<div className="flex items-start gap-4">
				<Link to={`/${user.username}`}>
					<img
						src={
							user.profilePic
								? user.profilePic
								: '/images/no_user_profile_pic.jpg'
						}
						className="size-10 md:size-16 rounded-full object-cover"
						alt={`${user.username}'s profile`}
					/>
				</Link>
				<div className="flex-1">
					<div className="flex justify-between items-center">
						<h1
							className="font-medium text-lg truncate"
							title={user.username}
						>
							{user.username}
						</h1>
						<p className="text-sm text-gray-500">
							{formatDistanceToNow(new Date(post.createdAt))}
						</p>
					</div>
					<p className="mt-2">{post.postText}</p>
					{post.postImage && (
						<img
							src={post.postImage}
							className="rounded-lg mt-4 w-full"
							alt="Post content"
						/>
					)}
				</div>
			</div>

			<div className="mt-4">
				<Actions post={post} />
			</div>

			<div className="mt-6">
				<form
					onSubmit={handlePostReply}
					className="flex items-center gap-2"
				>
					<input
						value={replyText}
						onChange={(e) => setReplyText(e.target.value)}
						className="flex-1 px-4 py-2 border rounded-md text-sm focus:outline-none"
						placeholder="Write a comment..."
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-500"
					>
						Comment
					</button>
				</form>
			</div>

			<div className="mt-6">
				{post.replies.length === 0 ? (
					<p className="text-center text-gray-500">
						No comments yet. Be the first to share your thoughts!
					</p>
				) : (
					post.replies.map((reply) => (
						<Comment
							key={reply._id}
							postCreator={reply.username}
							postTitle={reply.text}
							commentCreatedAt={reply.createdAt}
							profileImage={
								reply.userProfilePic
									? reply.userProfilePic
									: '/images/no_user_profile_pic.jpg'
							}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default PostPage;
