import { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiArrowsCounterClockwise } from 'react-icons/pi';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
function ActionsComment({ post, reply_id }) {
	const currentUser = useRecoilValue(userAtom);
	const currentComment = post.replies.find(
		(comment) => comment._id.toString() === reply_id
	);
	const [isLiked, setIsLiked] = useState(
		currentComment.repliesLikes.includes(currentUser.user._id)
	);
	const [commentLikesCounter, setCommentLikesCounter] = useState(
		currentComment.repliesLikes.length
	);
	const { enqueueSnackbar } = useSnackbar();
	async function handleLikeUnLike(e) {
		e.preventDefault();
		try {
			const response = await axios.put(
				`/api/posts/like_comment/${post._id}`,
				{
					userId: currentUser.user._id,
					commentId: reply_id,
				}
			);
			setIsLiked(!isLiked);
			setCommentLikesCounter(
				isLiked ? commentLikesCounter - 1 : commentLikesCounter + 1
			);
			enqueueSnackbar(response.data.message, { variant: 'success' });
		} catch (error) {
			enqueueSnackbar(error.response?.data?.message, {
				variant: 'error',
			});
			console.error(error.message);
		}
	}

	return (
		<>
			<div
				className="py-3 flex items-center gap-3 cursor-pointer"
				onClick={(e) => e.preventDefault()}
			>
				<CiHeart
					className={`size-6 md:size-8 ${
						isLiked ? 'text-red-500' : ''
					}`}
					onClick={handleLikeUnLike}
				/>
				<IoChatbubbleOutline className="size-4 md:size-6" />
				<PiArrowsCounterClockwise className="size-4 md:size-6" />
				<FiSend className="size-4 md:size-6" />
			</div>
			<div className="text-gray-400 flex gap-3">
				<h3>{commentLikesCounter} Likes</h3>
			</div>
		</>
	);
}

export default ActionsComment;
