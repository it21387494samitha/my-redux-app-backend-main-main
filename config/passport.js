import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/UserModel.js';
import jwt from 'jsonwebtoken';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email'] // Request profile and email scopes
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Google Profile:', profile); // Log the full profile objec

        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            // Save the additional fields (email, profilePicture)
            user = await new User({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,                 // Retrieve email
                profilePicture: profile.photos[0].value 
            }).save();

        } else {
            user.email = profile.emails[0].value;
            user.profilePicture = profile.photos[0].value;
            await user.save();
        
        }

        console.log('User Found or Created:', user);

        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Generated Token:', token);

        user.token = token;
        done(null, user);
    } catch (err) {
        console.error('Error in Passport Strategy:', err);
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
