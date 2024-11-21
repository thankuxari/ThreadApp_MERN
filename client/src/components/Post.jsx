import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import Actions from './Actions';
import { formatDistanceToNow } from 'date-fns';

function Post({ post }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(
                    `/api/users/profile/${post.postedBy}`
                );
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }
        getUser();
    }, []);
    return (
        <div>
            {loading ? (
                <span className="loading loading-spinner loading-lg mx-auto"></span>
            ) : (
                <Link
                    to={`/${user.username}/${post._id}`}
                    className="flex pb-10"
                >
                    <div className="w-24">
                        <img
                            src={
                                user.profilePic
                                    ? user.profilePic
                                    : '/images/no_user_profile_pic.jpg'
                            }
                            className="rounded-full size-12 md:size-16 object-cover"
                            alt="profile image"
                        />
                    </div>
                    <div className="w-full">
                        <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold">
                                {user.username}
                            </h1>
                            <div className="flex gap-6 items-center">
                                <h1 className="text-gray-400">
                                    {formatDistanceToNow(
                                        new Date(post.createdAt)
                                    )}
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
                                src={post.postImage}
                                className="rounded-xl pt-6 w-full"
                                alt="post image"
                            />
                        )}
                        <Actions post={post} />
                    </div>
                </Link>
            )}
        </div>
    );
}

export default Post;
