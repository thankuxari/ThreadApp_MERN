import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useSnackbar } from 'notistack';
import { IoIosLogOut } from 'react-icons/io';
function LogoutButton() {
	const loggedInUser = useSetRecoilState(userAtom);

	const { enqueueSnackbar } = useSnackbar();

	async function handleLogout(e) {
		e.preventDefault();
		try {
			const response = await axios.post('/api/users/logout');
			localStorage.removeItem('user');
			loggedInUser(null);
			enqueueSnackbar(response.data.message, { variant: 'success' });
		} catch (error) {
			enqueueSnackbar(error.message, { variant: 'error' });
			console.error(error.message);
		}
	}

	return (
		<div className='flex'>
			<button
				className="btn p-3 rounded-lg bg-gray-800"
				onClick={handleLogout}
			>
				<p className='hidden md:inline'>Logout</p> <IoIosLogOut className='text-xl'/>
			</button>
		</div>
	);
}

export default LogoutButton;
