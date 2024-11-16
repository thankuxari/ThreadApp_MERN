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
		<div>
			<button
				className="btn p-3 rounded-lg bg-gray-800"
				onClick={handleLogout}
			>
				Logout <IoIosLogOut className='text-xl'/>
			</button>
		</div>
	);
}

export default LogoutButton;
