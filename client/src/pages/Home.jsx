import CreatePost from '../components/CreatePost';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import SuggestedUsers from '../components/SuggestedUsers';

function Home() {
	const user = useRecoilValue(userAtom);
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPosts() {
			try {
				const response = await axios.get('/api/posts/feed', {
					userId: user.user._id,
				});
				setPosts(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error.message);
			}
		}
		getPosts();
	}, []);

	return (
		<div className="flex flex-col md:flex-row gap-3">
			<div className="overflow-x-hidden md:w-[75%]">
				<CreatePost />
				<h1 className="text-xl text-center mt-5">Your Feed 📜</h1>
				{loading ? (
					<div className="flex justify-center items-center">
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				) : (
					<div>
						{posts.length === 0 && (
							<h1 className="text-xl text-center mt-5">
								You need to follow some users
							</h1>
						)}
						{posts.map((post) => (
							<Post post={post} />
						))}
					</div>
				)}
			</div>
			<div className="w-[25%]">
				<SuggestedUsers />
			</div> 
		</div>
	);
}

export default Home;
