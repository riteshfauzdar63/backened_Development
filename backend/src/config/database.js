import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MongoDB_URI}`)
        console.log(`MongoDB connected !!! at ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongoDb connection failed", error);
        process.exit(1);
    }
}


export default connectDB;