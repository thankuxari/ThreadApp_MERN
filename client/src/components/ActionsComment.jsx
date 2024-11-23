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
function ActionsComment({ post }) {
    console.log(post.replies);

    const currentUser = useRecoilValue(userAtom);

    // const [isLiked, setIsLiked] = useState(
    //     post.replies.repliesLikes.includes(currentUser.user._id)
    // );

    return (
        <>
            <div
                className="py-3 flex items-center gap-3 cursor-pointer"
                onClick={(e) => e.preventDefault()}
            >
                <CiHeart
                // className={`size-6 md:size-8 ${
                //     isLiked ? 'text-red-500' : ''
                // }`}
                // onClick={handleLikeUnLike}
                />
                <IoChatbubbleOutline className="size-4 md:size-6" />
                <PiArrowsCounterClockwise className="size-4 md:size-6" />
                <FiSend className="size-4 md:size-6" />
            </div>
            <div className="text-gray-400 flex gap-3">
                <h3> Replies</h3>
                <h3>&#8226;</h3>
                <h3> Likes</h3>
            </div>
        </>
    );
}

export default ActionsComment;
