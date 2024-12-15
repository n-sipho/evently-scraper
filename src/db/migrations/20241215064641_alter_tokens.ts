import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("tokens", (table) => {
        table.text("token").notNullable().alter(); // Update column type
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("tokens", (table) => {
        table.string("token").notNullable().alter(); // Revert to original
    });
}