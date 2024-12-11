import { Knex } from "knex";
import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const config: Knex.Config = {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
        directory: "./db/migrations",
    },
};

export default config;