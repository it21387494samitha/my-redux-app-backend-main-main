import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String }, // Optional if you're using Google login only
    googleId: { type: String } ,// For Google login
    email: { type: String }, // Optional: User's email from Google
    profilePicture: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },


})

const UserModel = mongoose.model("User", userSchema);
export default UserModel;   