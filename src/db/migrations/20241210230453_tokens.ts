import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("tokens", (table) => {
        table.increments("id").primary().unique();
        table.string("token").notNullable();
        table.integer('user_id').unsigned().notNullable();
        table
            .foreign('user_id') // Define the foreign key
            .references('id')   // Reference column
            .inTable('users')   // Reference table
            .onDelete('CASCADE') // Optional: Action on delete
            .onUpdate('CASCADE'); // Optional: Action on update
    });
}


export async function down(knex: Knex): Promise<void> {
}

