import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import authScreenAtom from '../atoms/authAtom';
import userAtom from '../atoms/userAtom';
function SignUpCard() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authScreenState = useSetRecoilState(authScreenAtom);
    const setUser = useSetRecoilState(userAtom);
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();

    async function handleSignUpUser(e) {
        e.preventDefault();
        try {
            const response = await axios.post('api/users/signup', {
                name,
                username,
                email,
                password,
            });

            const user = response.data.user;

            enqueueSnackbar(`Signed Up Successfully ! Welcome ${name}`, {
                variant: 'success',
            });
            localStorage.setItem('user', JSON.stringify({ user }));

            setUser({ user });

            navigate(`/${username}`);
        } catch (error) {
            enqueueSnackbar(error.response?.data?.message, {
                variant: 'error',
            });
            console.error(error.message);
        }
    }

    return (
        <div className="w-[450px] mx-auto">
            <form
                className="flex flex-col gap-6 p-6 bg-slate-700 rounded-lg"
                onSubmit={handleSignUpUser}
            >
                <h1 className="text-center text-3xl font-bold">Sign Up</h1>
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
                    <input
                        type="text"
                        className="grow"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                    className="btn p-3 rounded-lg bg-gray-800"
                >
                    Sign Up
                </button>
                <h3 className="text-center">
                    Already have an account?{' '}
                    <Link
                        onClick={() => authScreenState('login')}
                        className="hover:underline text-gray-400"
                    >
                        Login
                    </Link>
                </h3>
            </form>
        </div>
    );
}

export default SignUpCard;
