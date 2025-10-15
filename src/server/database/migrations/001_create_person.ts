import {Knex} from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex){
    return knex
    .schema
    .createTable(ETableNames.person, table => {
        table.bigIncrements('id').primary().index();
        table.string('email').notNullable().unique();
        table.integer('fullName').notNullable();


        //fk configuration
        table.
        bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

        table.comment('#Table to store people information');
        
    })
    .then(() => {
        console.log(`Table ${ETableNames.person} created succefully.`)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists(ETableNames.person)
    .then(()=> {
        console.log(`#Table ${ETableNames.person} dropped succefully.`)
    });

    

}