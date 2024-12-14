import db from "../db/db";

export class SpotifyModel {
    static saveToken = async (token: string, userId: number) => {
        return await db.insert([token, userId]).into("tokens");
    }
    static getToken = async (userId: number) => {
        return await db("tokens").where({ user_id: userId });
    }
}