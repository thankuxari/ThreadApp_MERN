import express from 'express';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

async function getUserProfile(req, res) {
	const { query } = req.params;
	try {
		let user;
		if (mongoose.Types.ObjectId.isValid(query)) {
			user = await userModel.findOne({ _id: query }).select('-password');
		} else {
			user = await userModel
				.findOne({ username: query })
				.select('-password');
		}
		if (!user) {
			return res.status(400).json({ message: 'User does not exist' });
		}
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

async function getSuggestedUsers(req, res) {
	try {
		const loggedInUser = await userModel.findById(req.userId);

		const usersFollowedByLoggedInUser = loggedInUser.followers;

		const users = await userModel.aggregate([
			{
				$match: { _id: { $ne: req.userId } },
			},
			{
				$sample: { size: 10 },
			},
		]);

		const filteredUsers = users.filter(
			(user) => !usersFollowedByLoggedInUser.includes(user._id)
		);
		const suggestedusers = filteredUsers.slice(0, 4);

		return res.status(200).json(suggestedusers);
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function signUpUser(req, res) {
	const { name, username, email, password } = req.body;
	const passwordLengthRequirement = 6;
	const maxUsernameLength = 14;
	const maxNameLength = 12;
	try {
		name.trim();
		username.trim();
		email.trim();

		if (!name || !username || !email || !password)
			return res.status(400).json({ message: 'All fields are required' });

		const existingUser = await userModel.findOne({
			$or: [{ username }, { email }],
		});

		if (existingUser)
			return res
				.status(400)
				.json({ message: 'A User with this email already exists' });

		if (password.length < passwordLengthRequirement)
			return res.status(400).json({
				message: `Password must be at least ${passwordLengthRequirement} characters`,
			});

		if (username.length > maxUsernameLength)
			return res.status(400).json({
				message: 'Username must be equal or less than 14 characters',
			});

		if (name.length > maxNameLength)
			return res.status(400).json({
				message: 'Name must be equal or less than 12 characters',
			});

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await userModel.create({
			name,
			username,
			email,
			password: hashedPassword,
		});
		generateTokenAndSetCookie(user._id, res);
		res.status(201).json({
			message: `User created successfully! Welcome ${user.name}`,
			user: {
				_id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				profilePic: user.profilePic,
				bio: user.bio,
				followers: user.followers,
				following: user.following,
				likes: user.likes,
			},
		});
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function loginUser(req, res) {
	const { username, password } = req.body;
	try {
		if (!username || !password)
			return res.status(400).json({ message: 'All fields are required' });

		const user = await userModel.findOne({ username });

		if (!user)
			return res.status(400).json({ message: 'Invalid Credentials' });

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid Credentials' });

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			message: `Logged In Successfully! Welcome back ${user.name}`,
			user: {
				_id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				profilePic: user.profilePic,
				bio: user.bio,
				followers: user.followers,
				following: user.following,
				likes: user.likes,
			},
		});
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function logoutUser(req, res) {
	try {
		res.clearCookie('token');
		return res.status(200).json({ message: 'Logged Out Successfully' });
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function followUnFollowUser(req, res) {
	const { id } = req.params;
	try {
		const userToFollow = await userModel.findById(id);
		const currentUserLoggedIn = await userModel.findById(req.userId);

		if (id === req.userId.toString())
			return res
				.status(400)
				.json({ message: 'You cannot follow yourself' });

		if (!userToFollow || !currentUserLoggedIn)
			return res.status(400).json({ message: 'User does not exist' });

		const isFollowing = currentUserLoggedIn.following.includes(id);

		if (isFollowing) {
			await userModel.findByIdAndUpdate(req.userId, {
				$pull: { following: id },
			});

			await userModel.findByIdAndUpdate(id, {
				$pull: { followers: req.userId },
			});
			return res
				.status(200)
				.json({ message: 'User unfollowed successfully' });
		} else {
			await userModel.findByIdAndUpdate(req.userId, {
				$push: { following: id },
			});
			await userModel.findByIdAndUpdate(id, {
				$push: { followers: req.userId },
			});
			return res
				.status(200)
				.json({ message: 'User followed successfully' });
		}
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

async function updateUser(req, res) {
	const { name, username, email, bio } = req.body;
	let { profilePic } = req.body;
	const maxUsernameLength = 14;
	const maxNameLength = 12;
	try {
		const user = await userModel.findById(req.userId);
		if (!user)
			return res.status(400).json({ message: 'User does not exist' });

		if (req.params.id !== req.userId.toString())
			return res
				.status(400)
				.json({ message: 'You dont have access on this page' });

		name.trim();
		username.trim();
		email.trim();

		const existingUser = await userModel.findOne({ username });

		if (existingUser?.username == username)
			return res
				.status(400)
				.json({
					message: 'A user with this username already exists',
					field: 'username',
				});

		if (existingUser?.email == email)
			return res
				.status(400)
				.json({
					message: 'A user with this email already exists',
					field: 'email',
				});

		if (profilePic) {
			if (user.profilePic)
				await cloudinary.uploader.destroy(
					user.profilePic.split('/').pop().split('.')[0]
				);
			const uplaodResponse = await cloudinary.uploader.upload(profilePic);
			profilePic = uplaodResponse.secure_url;
		}

		user.name = name || user.name;
		user.username = username || user.username;
		user.email = email || user.email;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

		await user.save();

		return res.status(200).json({
			message: 'User updated successfully',
			user: {
				_id: user._id,
				name: user.name,
				username: user.username,
				email: user.email,
				profilePic: user.profilePic,
				bio: user.bio,
			},
		});
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
}

export {
	getUserProfile,
	signUpUser,
	loginUser,
	logoutUser,
	followUnFollowUser,
	updateUser,
	getSuggestedUsers,
};
