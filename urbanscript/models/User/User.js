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
    required: false,
  },
  credits: {
    type: Number,
    default: 2,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiration: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
