import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfilePage from './pages/UserProfilePage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import Auth from './pages/Auth';

function App() {
	return (
		<div className="mx-auto w-[72.5%] md:w-[620px] h-screen">
			<Header />
			<Routes>
				<Route path="/auth" element=<Auth /> />
				<Route path="/" element={<Home />} />
				<Route path="/:username" element={<UserProfilePage />} />
				<Route path="/:username/:postid" element={<PostPage />} />
			</Routes>
		</div>
	);
}

export default App;
