import db from "../db/db";
import { Token } from "../types/token";

export class SpotifyModel {
    static saveToken = async (token: string, userId: number) => {
        return await db("tokens").insert({ token, user_id: userId });
    }
    static getToken = async (userId: number) => {
        return await db<Token>("tokens").where({ user_id: userId });
    }
}