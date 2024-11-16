import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';

function UpdateProfile() {
	const [userProfilePic, setUserProfilePic] = useState('');
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [bio, setBio] = useState('');
	const navigate = useNavigate();

	const loggedInUser = useRecoilValue(userAtom);

	const { enqueueSnackbar } = useSnackbar();

	async function handleEditUser(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('name', name);
		formData.append('username', username);
		formData.append('bio', bio);
		formData.append('profilePic', userProfilePic);
		try {
			const response = await axios.post(
				`api/users/update_user/${loggedInUser.user._id}`,
				formData
			);

			const user = response.data.user;

			enqueueSnackbar('Profile Updated Successfully', {
				variant: 'success',
			});
			localStorage.setItem('user', JSON.stringify({ user }));
			navigate(`/${loggedInUser.user.username}`);
		} catch (error) {
			enqueueSnackbar(error.response.data.message, { variant: 'error' });
			console.error(error.message);
		}
	}

	return (
		<div className="w-[450px] mx-auto py-5">
			<form
				className="flex flex-col gap-6 p-6 bg-slate-700 rounded-lg"
				onSubmit={handleEditUser}
			>
				<h1 className="text-center text-3xl font-bold">
					Edit Your Profile
				</h1>
				<div className="flex items-center justify-between">
					<img
						src="./public/images/mark.jpg"
						className="size-24 rounded-full"
						alt=""
					/>
					<input
						type="file"
						className="block w-full px-2 py-1 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-primary-500 dark:focus:border-primary-500"
						onChange={(e) => setUserProfilePic(e.target.files[0])}
					/>
				</div>
				<label className="input input-bordered flex items-center gap-2">
					<input
						type="text"
						className="grow"
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="h-4 w-4 opacity-70"
					>
						<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
					</svg>
					<input
						type="text"
						className="grow"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label className="input input-bordered flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="h-4 w-4 opacity-70"
					>
						<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
						<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
					</svg>
					<input type="text" className="grow" placeholder="Email" />
				</label>
				<textarea
					className="textarea textarea-bordered"
					placeholder="Bio"
					onChange={(e) => setBio(e.target.value)}
				></textarea>
				<div className="mx-auto flex  w-full justify-around">
					<Link to={'/'} className="btn btn-error">
						Cancel
					</Link>
					<button
						type="submit"
						className="btn rounded-lg bg-gray-800"
					>
						Update
					</button>
				</div>
			</form>
		</div>
	);
}

export default UpdateProfile;
