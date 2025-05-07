import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already taken'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username must be at most 20 characters'],
  },
  image: {
    type: String,
  },
});

export default models.User || model('User', userSchema);