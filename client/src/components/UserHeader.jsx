import { useState } from 'react';
import { IoLogoInstagram } from 'react-icons/io5';
import { CiCircleMore } from 'react-icons/ci';
import { useSnackbar } from 'notistack';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserHeader({ user }) {
    const currentUser = useRecoilValue(userAtom);
    const [isFollowing, setIsFollowing] = useState(
        user.followers.includes(currentUser.user._id)
    );
    const [followersCount, setFollowersCount] = useState(user.followers.length);
    const { enqueueSnackbar } = useSnackbar();

    function handleCopyUrl() {
        const url = window.location.href;
        try {
            navigator.clipboard.writeText(url);
            enqueueSnackbar('URL copied to clipboard', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to copy URL', { variant: 'error' });
            console.error(error.message);
        }
    }

    async function handleFollowUnfollow(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/users/follow/${user._id}`);
            setIsFollowing((prev) => !prev);
            setFollowersCount((prev) => prev + (isFollowing ? -1 : 1));
            enqueueSnackbar(response.data.message, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
            console.error(error.message);
        }
    }
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-lg md:text-5xl font-bold">
                        {user.name === 'Kostas' ? (
                            <span>
                                {'Kostas'.split('').map((letter, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            color: `hsl(${
                                                (index / 'Kostas'.length) * 360
                                            }, 100%, 50%)`,
                                        }}
                                    >
                                        {letter}
                                    </span>
                                ))}
                            </span>
                        ) : (
                            user.name
                        )}
                    </h1>
                    <h4 className="text-sm md:text-lg pt-3 font-thin">
                        {user.username}
                    </h4>
                </div>
                <img
                    className="size-16 md:size-24 rounded-full"
                    src={
                        user.profilePic
                            ? user.profilePic
                            : '/images/no_user_profile_pic.jpg'
                    }
                    alt="User Profile Image"
                />
            </div>
            <div className="py-4">
                <p className="text-sm md:text-lg">{user.bio}</p>
            </div>
            {user._id === currentUser.user._id && (
                <div>
                    <Link
                        to={'/update'}
                        className="btn size-16 w-full md:btn-md md:w-auto"
                    >
                        Edit Profile
                    </Link>
                </div>
            )}
            {user._id !== currentUser.user._id && (
                <button
                    onClick={handleFollowUnfollow}
                    className="btn size-16 w-full md:btn-md md:w-auto"
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
            <div className="py-4 flex items-center justify-between flex-wrap">
                <div className=" text-gray-400 flex gap-3">
                    <h3 className="black w-[50%] md:w-auto">
                        {user.followers.length === 0
                            ? 'No Followers'
                            : user.followers.length > 1
                            ? `${followersCount} Followers`
                            : `${followersCount} Follower`}
                    </h3>
                    <h3>&#8226;</h3>
                    <a className="w-[50%] md:w-auto">
                        Occupation :{' '}
                        <span className="badge badge-sm badge-primary">
                            Comming Soon
                        </span>
                    </a>
                </div>
                <div className="flex gap-6 pr-1">
                    <IoLogoInstagram
                        className="tooltip tooltip-open tooltip-primary size-6 cursor-pointer hover:text-pink-600"
                        data-tip="Coming Soon"
                    />
                    <div className="dropdown dropdown-left">
                        <div tabIndex={0} role="button">
                            <CiCircleMore className="size-6 cursor-pointer hover:text-gray-600" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow"
                        >
                            <li onClick={handleCopyUrl}>
                                <a>Copy Link</a>
                            </li>
                            <li>
                                <a>
                                    Report User{' '}
                                    <span className="badge badge-sm badge-primary">
                                        Soon
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center py-5">
                <div className="w-full">
                    <h1 className="border-b-2 font-bold text-center border-white pb-2 cursor-pointer">
                        Threads
                    </h1>
                </div>
                <div className="w-full hidden md:inline">
                    <h1 className="border-b-2 text-gray-500 text-center border-gray-500 pb-2 cursor-pointer">
                        Replies{' '}
                        <span className="badge badge-sm badge-primary">
                            Comming Soon
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;
