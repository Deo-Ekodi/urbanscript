// models/User.js - schema to store user data
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 1, // Initialize credits to 1
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
},
  // can introduce timestamps
  {timestamps: true}
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
