import mongoose from 'mongoose';
import colors from 'colors';

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI).then(() => {
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
