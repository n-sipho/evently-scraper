import db from "../db/db";
import { User } from "../types/user";

export class UserModel {
    static createUser = async (user: User) => {
        return await db.insert(user).into("users").returning("*");
    }
    static getUserByEmail = async (email: string) => {
        return await db("users").where({ email });
    }
    static getUserById = async (id: number) => {
        return await db("users").where({ id });
    }
}