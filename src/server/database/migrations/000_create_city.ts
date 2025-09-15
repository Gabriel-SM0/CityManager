import {Knex} from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
    return knex
    .schema
    .createTable(ETableNames.city, table => {
        table.bigIncrements('id').primary().index();
        table.string('name',150).notNullable();
        table.string('country').notNullable();
        table.integer('population').notNullable();


        table.comment('#Table to store cities information');
        
    })
    .then(() => {
        console.log(`Table ${ETableNames.city} created succefully.`)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists(ETableNames.city)
    .then(()=> {
        console.log(`#Table ${ETableNames.city} dropped succefully.`)
    });

    

}