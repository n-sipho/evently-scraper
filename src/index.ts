import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import "./middleware/passport.middleware";
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { errorMorgan, infoMorgan } from './middleware/morgan-middleware';
import { errorHandler } from './utils/error-handler';
import { router } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for production environments
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(errorMorgan);
app.use(infoMorgan);

app.use(router);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});