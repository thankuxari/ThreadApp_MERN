import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImage from '../hooks/usePreviewImage';

function UpdateProfile() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();

    const { handleImageChange, imgUrl } = usePreviewImage();

    const loggedInUser = useRecoilValue(userAtom);

    const { enqueueSnackbar } = useSnackbar();

    async function handleEditUser(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                `api/users/update_user/${loggedInUser.user._id}`,
                {
                    name,
                    username,
                    bio,
                    profilePic: imgUrl,
                }
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
        <div className="md:max-w-md mx-auto py-8 px-2 md:px-4">
            <form
                className="flex flex-col gap-6 p-6 bg-gray-800 text-white rounded-lg shadow-lg"
                onSubmit={handleEditUser}
            >
                <h1 className="text-center text-2xl font-bold mb-4">
                    Edit Your Profile
                </h1>
                <div className="flex flex-col items-center">
                    <img
                        src={imgUrl || '/images/no_user_profile_pic.jpg'}
                        className="h-24 w-24 rounded-full object-cover mb-4"
                        alt="Profile"
                    />
                    <label className="text-sm font-semibold mb-2">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        className="text-sm text-gray-400 file:rounded-md file:bg-gray-700 file:border-none file:mr-3 file:cursor-pointer file:px-3 file:py-2"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="input w-full bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-md px-3 py-2"
                        placeholder={loggedInUser.user.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-semibold mb-2"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="input w-full bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-md px-3 py-2"
                        placeholder={loggedInUser.user.username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="input w-full bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-md px-3 py-2"
                        placeholder={loggedInUser.user.email}
                    />
                </div>
                <div>
                    <label
                        htmlFor="bio"
                        className="block text-sm font-semibold mb-2"
                    >
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        className="textarea w-full bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-md px-3 py-2"
                        placeholder={loggedInUser.user.bio}
                        rows="4"
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex justify-between items-center">
                    <Link
                        to={`/${loggedInUser.user.username}`} //}
                        className="btn bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="btn bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfile;
