import { Link } from 'react-router-dom';
import { IoIosMore } from 'react-icons/io';
import Actions from '../components/Actions';

function UserPost({
	postCreator,
	postTitle,
	profileImage,
	postImage,
	likes,
	replies,
}) {
	return (
		<Link to={'/daren/1'} className="flex pb-10">
			<div className="w-24">
				<img
					src={profileImage}
					className="rounded-full size-12 md:size-16 object-cover"
					alt="profile image"
				/>
			</div>
			<div className="w-full">
				<div className="flex justify-between items-center">
					<h1 className="text-xl font-semibold">{postCreator}</h1>
					<div className="flex gap-6 items-center">
						<h1 className="text-gray-400">1d</h1>
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
					<p>{postTitle}</p>
				</div>
				{postImage && (
					<img
						src={postImage}
						className="rounded-xl pt-6 w-full"
						alt="post image"
					/>
				)}
				<Actions />
				<div className="text-gray-400 flex gap-3">
					<h3>{replies} Replies</h3>
					<h3>&#8226;</h3>
					<a href="#" className="hover:underline">
						{likes} Likes
					</a>
				</div>
			</div>
		</Link>
	);
}

export default UserPost;
