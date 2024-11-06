import { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiArrowsCounterClockwise } from 'react-icons/pi';
import { FiSend } from 'react-icons/fi';
function Actions() {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<div
			className="py-3 flex items-center gap-3"
			onClick={(e) => e.preventDefault()}
		>
			<CiHeart
				className={`size-8 ${isLiked ? 'text-red-500' : ''}`}
				onClick={() => setIsLiked(!isLiked)}
			/>
			<IoChatbubbleOutline className="size-6" />
			<PiArrowsCounterClockwise className="size-6" />
			<FiSend className="size-6" />
		</div>
	);
}

export default Actions;
