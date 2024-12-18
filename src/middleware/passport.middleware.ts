import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../models/user.model";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
    },
        async (_accessToken, _refreshToken, profile, done) => {
            const email = profile.emails?.[0].value as string;
            const resp = await UserModel.getUserByEmail(email);
            const user = resp[0];
            if (!user) {
                const firstName = profile.name?.givenName as string;
                const lastName = profile.name?.familyName as string;
                const newUser = await UserModel.createUser({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: "google",
                });

                if (newUser) {
                    done(null, newUser);
                }
            }
            done(null, user);
        })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    const resp = await UserModel.getUserById(id);
    const user = resp[0];
    done(null, user);
});