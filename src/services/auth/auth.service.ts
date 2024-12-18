import { compare, hash, genSalt } from "bcryptjs";
import { UserModel } from "../../models/user.model";
import { User } from "../../types/user";
import { generateUserToken } from "../../utils/utils";
import { ApiError } from "../../utils/api-error";

export class AuthService {
    /**
     * createAccount
     */
    static signUp = async (data: User) => {
        const salt = await genSalt();
        const hashedPassword = await hash(data.password, salt);
        data.password = hashedPassword;
        const user = await UserModel.createUser(data);
        const token = generateUserToken(user);
        return token;
    }

    static signIn = async (data: User) => {
        const resp = await UserModel.getUserByEmail(data.email);
        const user = resp[0];
        if (!user) {
            throw new ApiError("Account not found", 404);
        }

        const isMatch = await compare(data.password, user.password);
        if (!isMatch) {
            throw new ApiError("Incorrect password or email", 500);
        }

        const token = generateUserToken(user);
        return token;
    }
}