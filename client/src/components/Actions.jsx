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
function Actions({ post }) {
    const currentUser = useRecoilValue(userAtom);
    const [isLiked, setIsLiked] = useState(
        post.likes.includes(currentUser.user._id)
    );
    const [likesCounter, setLikesCounter] = useState(post.likes.length);
    const { enqueueSnackbar } = useSnackbar();

    async function handleLikeUnLike(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/posts/like/${post._id}`, {
                userId: currentUser.user._id,
            });
            enqueueSnackbar(response.data.message, { variant: 'success' });
            setIsLiked(!isLiked);
            setLikesCounter(isLiked ? likesCounter - 1 : likesCounter + 1);
        } catch (error) {
            console.error(error.message);
        }
    }
    if (!post) {
        return <div>Post not found or still loading...</div>;
    }
    return (
        <>
            <div
                className="py-3 flex items-center gap-3 cursor-pointer"
                onClick={(e) => e.preventDefault()}
            >
                <CiHeart
                    className={`size-8 ${isLiked ? 'text-red-500' : ''}`}
                    onClick={handleLikeUnLike}
                />
                <IoChatbubbleOutline className="size-6" />
                <PiArrowsCounterClockwise className="size-6" />
                <FiSend className="size-6" />
            </div>
            <div className="text-gray-400 flex gap-3">
                <h3>{post.replies.length} Replies</h3>
                <h3>&#8226;</h3>
                <h3>{likesCounter} Likes</h3>
            </div>
        </>
    );
}

export default Actions;
