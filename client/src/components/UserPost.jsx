import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import Actions from '../components/Actions';
import { formatDistanceToNow } from 'date-fns';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
function UserPost({ post, user }) {
    const currentUser = useRecoilValue(userAtom);

    const { enqueueSnackbar } = useSnackbar();

    async function handleDeletePost(e) {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `/api/posts/delete_post/${post._id}`,
                {
                    postId: post._id,
                    userId: currentUser._id,
                }
            );
            enqueueSnackbar(response.data.message, { variant: 'success' });
            window.location.reload();
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
            console.error(error.message);
        }
    }

    return (
        <Link
            to={`/${user.username}/${post._id}`}
            className="flex flex-col  overflow-hidden border-b py-5 border-gray-700 pb-6"
        >
            <div className="flex gap-4">
                <Link to={`/${user.username}`} className="flex-shrink-0">
                    <img
                        src={
                            user.profilePic
                                ? user.profilePic
                                : '/images/no_user_profile_pic.jpg'
                        }
                        className="w-16 h-16 rounded-full object-cover"
                        alt={`${user.username}'s profile`}
                    />
                </Link>
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
                                className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow"
                            >
                                <li>
                                    <a>Copy Post Link</a>
                                </li>
                                <li>
                                    <a>Report Post</a>
                                </li>
                                {currentUser.user._id === post.postedBy && (
                                    <li>
                                        <a
                                            onClick={handleDeletePost}
                                            className="text-red-500"
                                        >
                                            Delete Post
                                        </a>
                                    </li>
                                )}
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

export default UserPost;
