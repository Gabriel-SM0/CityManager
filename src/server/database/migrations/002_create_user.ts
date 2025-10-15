import {Knex} from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
    return knex
    .schema
    .createTable(ETableNames.user, table => {
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable().checkLength('>', 3);
        table.string('email').notNullable().unique().checkLength('>', 5);
        table.string('password').notNullable().checkLength('>', 6).index();

 
        table.comment('#Table to store user information');
        
    })
    .then(() => {
        console.log(`Table ${ETableNames.user} created successfully.`)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists(ETableNames.user)
    .then(()=> {
        console.log(`#Table ${ETableNames.user} dropped succefully.`)
    });

    
}