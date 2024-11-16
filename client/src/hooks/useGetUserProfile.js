import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
function useGetUserProfile() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { username } = useParams();

	const { enqueueSnackbar } = useSnackbar();
	useEffect(() => {
		async function getUserProfile() {
			try {
				const response = await axios.get(
					`api/users/profile/${username}`
				);
				setUser(response.data);
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		}
		getUserProfile();
	}, []);

	return { user, isLoading };
}

export default useGetUserProfile;
