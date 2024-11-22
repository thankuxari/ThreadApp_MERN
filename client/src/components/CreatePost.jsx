import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImage from '../hooks/usePreviewImage';

function CreatePost() {
    const [postText, setPostText] = useState('');
    const postCreator = useRecoilValue(userAtom);
    const { enqueueSnackbar } = useSnackbar();
    const { handleImageChange, imgUrl } = usePreviewImage();

    async function handleCreatePost(e) {
        e.preventDefault();
        try {
            const response = await axios.post('/api/posts/create_post', {
                postText,
                postImg: imgUrl || '',
            });

            enqueueSnackbar('Post created successfully', {
                variant: 'success',
            });
        } catch (error) {
            enqueueSnackbar(
                error.response ? error.response.data.message : 'Error occurred',
                { variant: 'error' }
            );
            console.error(error.message);
        }
    }

    return (
        <div className="max-w-full mx-auto p-6  border border-gray-500 rounded-xl shadow-xl">
            <form className="flex flex-col gap-6" onSubmit={handleCreatePost}>
                <h1 className="text-3xl font-semibold text-white text-center">
                    Tell the world a story 🌍
                </h1>

                <textarea
                    className="textarea textarea-bordered w-full rounded-lg p-4 bg-gray-800 text-white placeholder-gray-400 border-gray-500 focus:outline-none focus:border-gray-400 transition duration-200"
                    placeholder="What's on your mind?"
                    onChange={(e) => setPostText(e.target.value)}
                    value={postText}
                ></textarea>

                <div>
                    <label
                        htmlFor="image"
                        className="text-lg text-gray-400 mb-2 block"
                    >
                        Add an image (optional)
                    </label>
                    <input
                        type="file"
                        id="image"
                        className="file-input file-input-bordered w-full rounded-lg bg-gray-700 text-gray-400"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="w-full flex justify-end">
                    <button
                        type="submit"
                        className="btn md:btn-wide rounded-lg bg-gray-800 text-white hover:bg-gray-700"
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
