import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'journiq',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};