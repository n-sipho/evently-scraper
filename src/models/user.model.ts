import db from "../db/db";
import { User } from "../types/interfaces"
import { UserType } from "../types/user";

export class UserModel {
    static createUser = async (user: User) => {
        return await db.insert(user).into("users").returning("*");
    }
    static getUserByEmail = async (email: string) => {
        return await db<UserType>("users").where({ email });
    }
    static getUserById = async (id: number) => {
        return await db<UserType>("users").where({ id });
    }
}