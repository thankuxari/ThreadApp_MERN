import mongoose from 'mongoose';
import colors from 'colors';

const MONGO_URI = process.env.MONGO_URI;
async function connectDB() {
	try {
		await mongoose.connect(MONGO_URI).then(() => {
			console.log('MongoDB connected'.green.bold);
		});
	} catch (error) {
		console.error({
			message: 'Failed to connect to MongoDB'.red.bold,
		});
        process.exit(1);
	}
}

export default connectDB;
