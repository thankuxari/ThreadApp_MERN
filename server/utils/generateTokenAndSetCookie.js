import jwt from 'jsonwebtoken';

function generateTokenAndSetCookie(userId, res) {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: '5d',
	});

	res.cookie('token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 5 * 24 * 60 * 60 * 1000,
	});

	return token;
}

export default generateTokenAndSetCookie;
