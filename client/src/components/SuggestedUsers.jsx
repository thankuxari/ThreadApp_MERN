import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import SuggestedUser from './SuggestedUser';

function SuggestedUsers() {
	const [SuggestedUsers, setSuggestedUsers] = useState([]);
	const currentUser = useRecoilValue(userAtom);

	useEffect(() => {
		async function getSuggestedUsers() {
			try {
				const response = await axios.get('/api/users/suggested_users', {
					userId: currentUser.user._id,
				});
				setSuggestedUsers(response.data);
			} catch (error) {
				console.error(error.message);
			}
		}
		getSuggestedUsers();
	}, []);

	console.log(SuggestedUsers);
    if(SuggestedUsers.length === 0) return null;
	return (
		<div className="w-full">
            <h1 className="text-xl font-semibold">Suggested Users</h1>
			{SuggestedUsers.map((suggestedUser) => (
				<SuggestedUser
					key={suggestedUser._id}
					suggestedUser={suggestedUser}
				/>
			))}
		</div>
	);
}

export default SuggestedUsers;
