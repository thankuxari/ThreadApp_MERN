import { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
function PostPage({
	postCreator,
	postTitle,
	profileImage,
	postImage,
	likes,
	replies,
}) {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<div className="flex flex-col">
			<div className="flex pb-10">
				<div className="w-24">
					<img
						src="../public/images/mark.jpg"
						className="rounded-full size-12 md:size-16 object-cover"
						alt="profile image"
					/>
				</div>
				<div className="w-full">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-semibold">Marky</h1>
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
						<p>EpicPost</p>
					</div>
					<img
						src="../public/images/marky.webp"
						className="rounded-xl pt-6 w-full"
						alt="post image"
					/>
					<Actions />
					<div className="text-gray-400 flex gap-3">
						<h3>243 Replies</h3>
						<h3>&#8226;</h3>
						<h3>38 Likes</h3>
					</div>
					<div className="pt-2">
						<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
						<div className="flex gap-3">
							<input
								className="input w-full p-3 rounded-lg bg-gray-600"
								placeholder="🎉 Share your opinion with a comment."
							/>
							<button className="btn p-3 rounded-lg bg-gray-800">
								Comment
							</button>
						</div>
						<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
					</div>
				</div>
			</div>
			<Comment
				postCreator={'Marky'}
				postTitle={'Awesome Post'}
				profileImage={'../public/images/marky.webp'}
				likes={14}
				replies={3}
			/>
			<Comment
				postCreator={'Mr. Giveon'}
				postTitle={'This shit trash'}
				profileImage={'../public/images/mark.jpg'}
				likes={24}
				replies={12}
			/>
			<Comment
				postCreator={'Peter'}
				postTitle={'I aggree with Marky!'}
				profileImage={'../public/images/marky2.jpg'}
				likes={14}
				replies={3}
			/>
		</div>
	);
}

export default PostPage;
