import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import Actions from './Actions';
import { formatDistanceToNow } from 'date-fns';

function Post({ post }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(
                    `/api/users/profile/${post.postedBy}`
                );
                setUser(response.data);
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [post.postedBy]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center text-gray-500">
                User data could not be loaded.
            </div>
        );
    }

    return (
        <Link
            to={`/${user.username}/${post._id}`}
            className="flex flex-col overflow-hidden border-b mt-7 border-gray-700 pb-6"
        >
            <div className="flex gap-4">
                <div className="flex-shrink-0 md:py-3">
                    <img
                        src={
                            user.profilePic
                                ? user.profilePic
                                : '/images/no_user_profile_pic.jpg'
                        }
                        className="size-12 md:w-16 md:h-16 rounded-full object-cover"
                        alt={`${user.username}'s profile`}
                    />
                </div>
                <div className="flex flex-col justify-center w-full">
                    <div className="flex justify-between items-center">
                        <Link
                            to={`/${user.username}`}
                            className="text-lg md:text-xl font-bold hover:underline"
                        >
                            {user.username}
                        </Link>
                        <div className="dropdown dropdown-left">
                            <div tabIndex={0} role="button">
                                <IoIosMore
                                    className="text-xl text-gray-500 cursor-pointer hover:text-gray-300"
                                    onClick={(e) => e.preventDefault()}
                                />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-slate-800 rounded-box z-[1] w-52 p-2 shadow"
                            >
                                <li>
                                    <a
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                `/${user.username}/${post._id}`
                                            )
                                        }
                                    >
                                        Copy Post Link
                                    </a>
                                </li>
                                <li>
                                    <a>Report Post</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <span className="text-sm text-gray-400">
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm md:text-lg text-gray-300">
                    {post.postText}
                </p>
                {post.postImage && (
                    <img
                        src={post.postImage}
                        className="mt-4 rounded-xl w-full object-cover"
                        alt="Post content"
                    />
                )}
            </div>

            <div className="mt-6">
                <Actions post={post} />
            </div>
        </Link>
    );
}

export default Post;
