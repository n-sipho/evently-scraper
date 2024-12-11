import { hashSync, compareSync, compare, hash, genSalt } from "bcryptjs";
import { User } from "../types/interfaces";
import { UserModel } from "../models/user.model";
import passport from "passport";

export class AuthService {
    /**
     * createAccount
     */
    static createAccount = async (data: User) => {
        const salt = await genSalt();
        const hashedPassword = await hash(data.password, salt);

        data.password = hashedPassword;

        const results = await UserModel.createUser(data);
        const user = results[0];
        // const token = generateToken(user);

        // return { token, email: user.email, type: user.type };
    }

    static signInWithGoogle = async () => {
        // passport.authenticate("google", { scope: ["profile", "email"] });
    }

    static googleAuthCallBack = async () => {
        // passport.authenticate("google");
    }
}