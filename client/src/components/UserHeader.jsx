import { IoLogoInstagram } from 'react-icons/io5';
import { CiCircleMore } from 'react-icons/ci';
import { useSnackbar } from 'notistack';

function UserHeader() {
	const { enqueueSnackbar } = useSnackbar();

	function handleCopyUrl() {
		const url = window.location.href;
		try {
			navigator.clipboard.writeText(url);
			enqueueSnackbar('URL copied to clipboard', { variant: 'success' });
		} catch (error) {
			enqueueSnackbar('Failed to copy URL', { variant: 'error' });
			console.error(error.message);
		}
	}

	return (
		<div>
			<div className="flex justify-between">
				<div>
					<h1 className="text-5xl font-bold">User</h1>
					<h4 className="text-md pt-1 font-thin">Username</h4>
				</div>
				<img
					className="size-24 rounded-full"
					src="./public/images/mark.jpg"
					alt="User Profile Image"
				/>
			</div>
			<div className="py-4">
				<p>This is demo description that user inputs</p>
			</div>
			<div className="py-4 flex items-center justify-between flex-wrap    ">
				<div className="text-gray-400 flex gap-3">
					<h3>3.2k Followers</h3>
					<h3>&#8226;</h3>
					<a href="#" className="hover:underline">
						instagram.com
					</a>
				</div>
				<div className="flex gap-6 pr-1">
					<IoLogoInstagram className="size-6 cursor-pointer hover:text-pink-600" />
					<div className="dropdown dropdown-bottom">
						<div tabIndex={0} role="button">
							<CiCircleMore className="size-6 cursor-pointer hover:text-gray-600" />
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow"
						>
							<li onClick={handleCopyUrl}>
								<a>Copy Link</a>
							</li>
							<li>
								<a>Report User</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="flex justify-center py-5">
				<div className="w-full">
					<h1 className="border-b-2 font-bold text-center border-white pb-2 cursor-pointer">
						Threads
					</h1>
				</div>
				<div className="w-full">
					<h1 className="border-b-2 text-gray-500 text-center border-gray-500 pb-2 cursor-pointer">
						Replies
					</h1>
				</div>
			</div>
		</div>
	);
}

export default UserHeader;
