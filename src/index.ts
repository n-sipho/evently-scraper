import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { authRoutes } from "./routes/auth.routes";
import "./middleware/passport.middleware";
import passport from 'passport';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SECRET as string, // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for production environments
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});