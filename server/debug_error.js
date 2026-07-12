import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function test() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    const user = await User.findOne();
    if (!user) {
      console.log('No user found');
      process.exit(0);
    }
    console.log('User found:', user.email);
    user.name = user.name; // Trigger some change
    
    // Test what happens when we save without changing password
    await user.save();
    console.log('User saved successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error caught during save:', error);
    process.exit(1);
  }
}

test();
