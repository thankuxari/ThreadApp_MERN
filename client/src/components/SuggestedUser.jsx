import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

function SuggestedUser({ suggestedUser }) {
	const { enqueueSnackbar } = useSnackbar();
	const currentUser = useRecoilValue(userAtom);
	const [isFollowing, setIsFollowing] = useState(
		suggestedUser.followers.includes(currentUser.user._id)
	);

	async function handleFollowUnfollow(e) {
		e.preventDefault();
		try {
			const response = await axios.post(
				`/api/users/follow/${suggestedUser._id}`
			);
			enqueueSnackbar(response.data.message, { variant: 'success' });
			setIsFollowing((prev) => !prev);
		} catch (error) {
			enqueueSnackbar(error.response?.data?.message || 'Error occurred', {
				variant: 'error',
			});
			console.error(error.message);
		}
	}

	return (
		<div className="w-[250px] flex items-center justify-between gap-4 py-4 px-2 border-b border-gray-700">
			<Link
				to={`/${suggestedUser.username}`}
				className="flex items-center gap-3"
			>
				<img
					src={
						suggestedUser.profilePic
							? suggestedUser.profilePic
							: '/images/no_user_profile_pic.jpg'
					}
					alt={`${suggestedUser.username}'s profile`}
					className="size-6 md:size-9 rounded-full object-cover"
				/>
				<div className="flex flex-col max-w-[90px]">
					<h3
						className="font-semibold md:text-base text-gray-100 hover:underline truncate"
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{suggestedUser.name}
					</h3>
					<h4 className="text-xs md:text-sm text-gray-400 truncate">
						{suggestedUser.username}
					</h4>
				</div>
			</Link>

			{/* Follow/Unfollow Button */}
			<button
				onClick={handleFollowUnfollow}
				className={`px-4 py-1 text-sm font-medium rounded-lg transition ${
					isFollowing
						? 'bg-gray-600 hover:bg-gray-500 text-gray-100'
						: 'bg-blue-500 hover:bg-blue-400 text-white'
				}`}
			>
				{isFollowing ? 'Following' : 'Follow'}
			</button>
		</div>
	);
}

export default SuggestedUser;
