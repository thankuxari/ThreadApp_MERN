import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfilePage from './pages/UserProfilePage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import Auth from './pages/Auth';
import axios from 'axios';
import userAtom from './atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5000';

function App() {
    const user = useRecoilValue(userAtom);

    return (
        <div className="mx-auto w-[72.5%] md:w-[620px] h-screen">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/auth"
                    element={!user ? <Auth /> : <Navigate to="/" />}
                />
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<Home />} />
                <Route path="/:username" element={<UserProfilePage />} />
                <Route path="/:username/:postid" element={<PostPage />} />
            </Routes>
        </div>
    );
}

export default App;
