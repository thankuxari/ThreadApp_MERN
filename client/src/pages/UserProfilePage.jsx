import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
function UserProfilePage() {
	return (
		<>
			<UserHeader />
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
