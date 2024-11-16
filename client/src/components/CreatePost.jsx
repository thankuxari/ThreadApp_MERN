import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
function CreatePost() {
	const [postText, setPostText] = useState('');
	const [postImage, setPostImage] = useState('');
	const postCreator = useRecoilValue(userAtom);
	const { enqueueSnackbar } = useSnackbar();

	async function handleCreatePost(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append('postText', postText);
		formData.append('postImage', postImage);
		try {
			const response = await axios.post(
				'/api/posts/create_post',
				formData
			);

			enqueueSnackbar('Post created successfully', {
				variant: 'success',
			});
		} catch (error) {
			enqueueSnackbar(error.response, { variant: 'error' });
			console.error(error.message);
		}
	}

	return (
		<div>
			<form
				className="flex flex-col gap-5 border rounded-lg border-gray-500 p-5"
				onSubmit={handleCreatePost}
			>
				<h1 className="text-3xl"> Tell the wolrd a story 🌍</h1>
				<textarea
					className="textarea textarea-bordered w-full "
					onChange={(e) => setPostText(e.target.value)}
				></textarea>
				<label htmlFor="">Add an image</label>
				<input
					type="file"
					onChange={(e) => setPostImage(e.target.files[0])}
				/>
				<div className="w-full flex justify-end">
					<button
						type="submit"
						className="btn btn-wide rounded-lg bg-gray-800"
					>
						Post
					</button>
				</div>
			</form>
		</div>
	);
}

export default CreatePost;
