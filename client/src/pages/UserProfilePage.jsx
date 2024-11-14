import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import axios from 'axios';
import useGetUserProfile from '../hooks/useGetUserProfie';
function UserProfilePage() {
	const { user, isLoading } = useGetUserProfile();

	if (!user && isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	}

	if (!user && !isLoading)
		return <h1 className="text-center">User not found</h1>;
	return (
		<>
			<UserHeader user={user} />
			<UserPost
				postCreator={'Daren'}
				postTitle={'Epic post title here Daren!'}
				profileImage={'../public/images/mark.jpg'}
				postImage={'../public/images/marky.webp'}
				likes={450}
				replies={230}
			/>
			<UserPost
				postCreator={'Marky'}
				postTitle={'Another epic post title here Marky!'}
				profileImage={'../public/images/marky.webp'}
				postImage={'../public/images/marky2.jpg'}
				likes={150}
				replies={36}
			/>
			<UserPost
				postCreator={'Marky'}
				postTitle={'An Epic Post without an image!'}
				profileImage={'../public/images/marky.webp'}
				likes={14}
				replies={3}
			/>
		</>
	);
}

export default UserProfilePage;
