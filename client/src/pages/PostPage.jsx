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
			window.location.reload();
		} catch (error) {
			enqueueSnackbar(error.response?.data?.message, {
				variant: 'error',
			});
			console.error(error.message);
		}
	}

	if (loading) {
		return (
			<span className="loading loading-spinner loading-lg mx-auto"></span>
		);
	}

	if (!post || !user) {
		return <div>No post found</div>;
	}

	return (
		<div className="flex flex-col">
			<div className="flex pb-10">
				<Link to={`/${user.username}`} className="w-24">
					<img
						src={
							user.profilePic
								? `http://localhost:5000/${user.profilePic}`
								: '../public/images/no_user_profile_pic.jpg'
						}
						className="rounded-full size-12 md:size-16 object-cover"
						alt={`${user.username}'s profile`}
					/>
				</Link>
				<div className="w-full">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-semibold">
							{user.username}
						</h1>
						<div className="flex gap-6 items-center">
							<h1 className="text-gray-400">
								{formatDistanceToNow(new Date(post.createdAt))}
							</h1>
							<div className="dropdown dropdown-bottom">
								<div tabIndex={0} role="button">
									<IoIosMore
										className="size-6 cursor-pointer hover:text-gray-600"
										onClick={(e) => e.preventDefault()}
									/>
								</div>
								<ul
									tabIndex={0}
									className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow"
								>
									<li>
										<a>Copy Post Link</a>
									</li>
									<li>
										<a>Report Post</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="pt-3">
						<p>{post.postText}</p>
					</div>
					{post.postImage && (
						<img
							src={`http://localhost:5000/${post.postImage}`}
							className="rounded-xl pt-6 w-full"
							alt="Post content"
						/>
					)}
					<Actions />
					<div className="text-gray-400 flex gap-3">
						<h3>{post.replies.length} Replies</h3>
						<h3>&#8226;</h3>
						<h3>{post.likes.length} Likes</h3>
					</div>
					<div className="pt-2">
						<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
						<div className="flex gap-3">
							<form onSubmit={handlePostReply} className="w-full">
								<input
									className="input w-full p-3 rounded-lg bg-gray-600"
									placeholder="🎉 Share your opinion with a comment."
									onChange={(e) =>
										setReplyText(e.target.value)
									}
								/>
								<button
									type="submit"
									className="btn p-3 rounded-lg bg-gray-800"
								>
									Comment
								</button>
							</form>
						</div>
						<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
					</div>
				</div>
			</div>

			{post.replies.map((reply) => (
				<Comment
					key={reply._id}
					postCreator={reply.username}
					postTitle={reply.text}
					commentCreatedAt={reply.createdAt}
					profileImage={
						reply.userProfilePic
							? `http://localhost:5000/${reply.userProfilePic}`
							: '/public/images/no_user_profile_pic.jpg'
					}
				/>
			))}
		</div>
	);
}

export default PostPage;
