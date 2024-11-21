import { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';
import axios from 'axios';
import useGetUserProfile from '../hooks/useGetUserProfile';

function UserProfilePage() {
    const { user, isLoading } = useGetUserProfile();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUserPosts() {
            if (user?.username) {
                try {
                    const response = await axios.get(
                        `/api/posts/user/${user.username}`
                    );
                    setPosts(response.data);
                } catch (error) {
                    console.error(error.message);
                } finally {
                    setLoading(false);
                }
            }
        }

        getUserPosts();
    }, [user]);

    if (!user) {
        return <h1 className="text-center">User not found</h1>;
    }
    if (isLoading || loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <>
            <UserHeader user={user} />
            {posts.map((post) => (
                <UserPost key={post._id} post={post} user={user} />
            ))}
        </>
    );
}

export default UserProfilePage;
