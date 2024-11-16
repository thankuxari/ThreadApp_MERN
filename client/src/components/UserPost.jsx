import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import Actions from '../components/Actions';
import { formatDistanceToNow } from 'date-fns';

function UserPost({ post, user }) {
	return (
		<Link to={`/${user.username}/${post._id}`} className="flex pb-10">
			<div className="w-24">
				<img
					className="rounded-full size-12 md:size-16 object-cover"
					src={
						user.profilePic
							? `http://localhost:5000/${user.profilePic}`
							: './public/images/no_user_profile_pic.jpg'
					}
					alt="User Profile Image"
				/>
			</div>
			<div className="w-full">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold">{user.username}</h1>
					<div className="flex gap-6 items-center">
						<h1 className="text-gray-400">
							{formatDistanceToNow(new Date(post.createdAt))}
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
						src={`http://localhost:5000/${post.postImage}`}
						className="rounded-xl pt-6 w-full"
						alt="post image"
					/>
				)}
				<Actions />
				<div className="text-gray-400 flex gap-3">
					<h3>{post.replies.length} Replies</h3>
					<h3>&#8226;</h3>
					<a href="#" className="hover:underline">
						{post.likes.length} Likes
					</a>
				</div>
			</div>
		</Link>
	);
}

export default UserPost;
