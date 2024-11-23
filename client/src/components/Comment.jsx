import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import Actions from './Actions';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { formatDistanceToNow } from 'date-fns';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ActionsComment from './ActionsComment.jsx';
function Comment({
    commentCreator,
    commentTitle,
    profileImage,
    commentPostedById,
    commentCreatedAt,
    postId,
    post,
    key,
    reply,
}) {
    const [isLiked, setIsLiked] = useState();
    const currentUser = useRecoilValue(userAtom);
    const { enqueueSnackbar } = useSnackbar();

    async function handleCommentDeletion(e) {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/api/posts/delete_comment/${post._id}`,
                { commentId: reply._id }
            );
            enqueueSnackbar(response.data.message, { variant: 'success' });
            window.location.reload();
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message || 'Error occurred', {
                variant: 'error',
            });
            console.error(error.message);
        }
    }

    return (
        <div className="flex h-full pb-10">
            <Link to={`/${commentCreator}`} className="w-24">
                <img
                    className="rounded-full size-10 md:size-16 object-cover"
                    src={profileImage}
                    alt="User Profile Image"
                />
            </Link>
            <div className="w-full">
                <div className="flex justify-between items-center ">
                    <h1 className="text-md md:text-2xl font-semibold">
                        {commentCreator}
                    </h1>
                    <div className="flex gap-6 items-center">
                        <h1 className="text-gray-400"></h1>
                        <div className="dropdown dropdown-left">
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
                                    <a>Go to user profile</a>
                                </li>
                                <li>
                                    <a>Report Comment</a>
                                </li>
                                {currentUser.user._id === commentPostedById && (
                                    <li onClick={handleCommentDeletion}>
                                        <a className="text-red-500">
                                            Delete Comment
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pt-3">
                    <p>{commentTitle}</p>
                </div>
                {/* <ActionsComment post={post} /> */}
            </div>
        </div>
    );
}

export default Comment;
