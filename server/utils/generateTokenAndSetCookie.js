import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

function generateTokenAndSetCookie(userId, res) {
	const token = jwt.sign({ userId }, JWT_SECRET, {
		expiresIn: '15h',
	});

	res.cookie('token', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 15 * 60 * 60 * 1000,
	});

	return token;
}

export default generateTokenAndSetCookie;
