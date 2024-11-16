import CreatePost from '../components/CreatePost';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useState, useEffect } from 'react';
import Post from '../components/Post';

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
		<div>
			<CreatePost />
			<h1 className="text-xl text-center mt-5">Your Feed 📜</h1>
			{loading ? (
				<div className="flex justify-center items-center">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			) : (
				<div>
					{posts.map((post) => (
						<Post post={post} />
					))}
				</div>
			)}
		</div>
	);
}

export default Home;
