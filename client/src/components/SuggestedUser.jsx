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
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
            console.error(error.message);
        }
    }
    return (
        <Link
            to={`/${suggestedUser.username}`}
            className="flex items-center gap-5 py-2"
        >
            <img
                src={
                    suggestedUser.profilePic
                        ? suggestedUser.profilePic
                        : '/images/no_user_profile_pic.jpg'
                }   
                className="size-10 rounded-full"
                alt=""
            />
            <div>
                <h3 className="text-md w-20">{suggestedUser.username}</h3>
                <h4 className="text-sm text-gray-500">{suggestedUser.name}</h4>
            </div>
            <button
                onClick={handleFollowUnfollow}
                className="btn btn-sm btn-primary"
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>
        </Link>
    );
}

export default SuggestedUser;
