import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';

async function protectRoutes(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(400).json({ message: 'Not logged in' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
		
        const user = await userModel
            .findById(decoded.userId)
            .select('-password');

        req.userId = user._id;

        if (!user)
            return res.status(400).json({ message: 'User does not exist' });

        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export default protectRoutes;
