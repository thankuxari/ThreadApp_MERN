import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import Actions from './Actions';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
function Comment({
	postCreator,
	postTitle,
	profileImage,
	likes,
	replies,
	commentCreatedAt,
}) {
	const [isLiked, setIsLiked] = useState(false);
    
	return (
		<div className="flex pb-10">
			<Link to={`/${postCreator}`} className="w-24">
				<img
					className="size-14 rounded-full"
					src={profileImage}
					alt="User Profile Image"
				/>
			</Link>
			<div className="w-full">
				<div className="flex justify-between items-center ">
					<h1 className="text-xl font-semibold">{postCreator}</h1>
					<div className="flex gap-6 items-center">
						<h1 className="text-gray-400"></h1>
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
									<a>Go to user profile</a>
								</li>
								<li>
									<a>Report Comment</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="pt-3">
					<p>{postTitle}</p>
				</div>
				<Actions />
				<div className="text-gray-400 flex gap-3">
					<h3>{replies} Replies</h3>
					<h3>&#8226;</h3>
					<h3>{likes} Likes</h3>
				</div>
			</div>
		</div>
	);
}

export default Comment;
