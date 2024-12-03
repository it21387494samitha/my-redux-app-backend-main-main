import mongoose from "mongoose";
import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import fs from 'fs';
import path from 'path';





const secretKey = "samitha"; // Use a secure secret key


const storage = multer.memoryStorage(); // Store the image in memory as a buffer
const upload = multer({ storage: storage }); // Use memory storage for multer

// Helper function to validate Google email
const isGoogleEmail = (email) => {
    const emailDomain = email.split('@')[1];
    return emailDomain === 'gmail.com' || emailDomain.endsWith('.google.com');
};






export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};





export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};



export function CreateAdmin(req, res) {
    const { email, password } = req.body;

    UserModel.findOne({ email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: "Error hashing password", error: err });
                }

                const newAdmin = new UserModel({
                    email,
                    password: hash,
                    isAdmin: true
                });

                newAdmin.save()
                    .then(user => res.status(201).json(user))
                    .catch(err => res.status(500).json({ message: "Error saving user", error: err }));
            });
        })
        .catch(err => res.status(500).json({ message: "Error finding user", error: err }));
}





export function getAllUsers(req, res) {
    UserModel.find({})
        .then(users => {
            res.status(200).json(users); // Return all users
        })
        .catch(err => {
            res.status(500).json({ message: "Error fetching users", error: err });
        });
}



// Fetch user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);  // req.user.id should come from the middleware
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture|| 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg'
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
        console.log(user);
    }
};




export const uploadProfileImage = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Save image data
      user.profileImage = {
        data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
        contentType: req.file.mimetype,
      };
  
      await user.save();
  
      res.json({ message: 'Profile image uploaded successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to upload image.' });
    }
  };




  