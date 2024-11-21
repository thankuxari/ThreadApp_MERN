import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfilePage from './pages/UserProfilePage';
import PostPage from './pages/PostPage';
import Header from './components/Header';
import Auth from './pages/Auth';
import UpdateProfile from './pages/UpdateProfile';
import Patchnotes from './pages/Patchnotes';
import axios from 'axios';
import userAtom from './atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { Navigate, useLocation } from 'react-router-dom';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://threadapp-mern.onrender.com/';
// axios.defaults.baseURL = 'http://localhost:5000';

function App() {
    const user = useRecoilValue(userAtom);

    const { pathname } = useLocation();
    return (
        <div
            className={`mx-auto w-[72.5%] h-screen ${
                pathname === '/' ? 'md:w-[790px]' : 'md:w-[650px]'
            }`}
        >
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
                <Route
                    path="/update"
                    element={user ? <UpdateProfile /> : <Navigate to="/auth" />}
                />
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/:username"
                    element={
                        user ? <UserProfilePage /> : <Navigate to="/auth" />
                    }
                />
                <Route
                    path="/:username/:postid"
                    element={user ? <PostPage /> : <Navigate to="/auth" />}
                />
                <Route path="/patchnotes" element={<Patchnotes />} />
            </Routes>
        </div>
    );
}

export default App;
