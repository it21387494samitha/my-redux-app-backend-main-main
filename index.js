import express from 'express';
import session from 'express-session';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js'; 
import './config/passport.js'; 
import eventRouter from './Routers/EventRoutes.js';
import seatRouter from './Routers/seatRoutes.js';
import userRouter from './Routers/UserRouter.js';
import feedbackRouter from './Routers/FeedbackRouter.js';


dotenv.config(); 

const app = express();

// Middleware configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://newsltazure.azurewebsites.net',
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

// Connect to the database
connectDB()
    .then(() => {
        // Session configuration
        app.use(session({
            secret: process.env.SESSION_SECRET || 'your_secret_key',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                httpOnly: true,
                sameSite: 'strict',
            },
        }));

        // Passport configuration
        app.use(passport.initialize());
        app.use(passport.session());

        // Routes
        app.get('/', (req, res) => {
            res.send('Welcome to the Home Page!');
        });

        app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

        app.get('/auth/google/callback',
            passport.authenticate('google', { failureRedirect: '/' }),
            (req, res) => {
                const token = req.user.token;
                const profilePicture = req.user.profilePicture || 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg';
                const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
                res.redirect(`${clientUrl}/auth/google/success?token=${token}&profilePicture=${encodeURIComponent(profilePicture)}`);
            }
        );

        // API routes
        app.use('/events', eventRouter);
        app.use('/api/seats', seatRouter);
        app.use('/users', userRouter);
        app.use('/api/feedback', feedbackRouter);

        // Static files serving for production
        const __dirname = path.resolve();
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '/frontend/build')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
            });
        }

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send(process.env.NODE_ENV === 'development' ? err.message : 'Server error');
        });

        // Start the server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit if the connection fails
    });
