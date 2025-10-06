import { IPerson } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../index";

export const updateById = async (id: number, person: Omit<IPerson, 'id'>): Promise<void | Error> => {

    try {
        const [{ count }] = await Knex(ETableNames.city)
            .where('id', '=', person.cityId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error("The city assocated with this  register were not found")
        }

        console.log(`Trying to update the person with the id: ${id}.`)
        const result = await Knex(ETableNames.person)
            .update(person)
            .where('id', '=', id);

        if (result > 0) {
            console.log(`Update finished on id: ${id}.`)

            return;
        }

        if (result === 0) {
            return new Error(`No person associate with this ID: ${id}.`)
        }

        console.log(`Update finished on ID: ${id}.`);

    } catch (error: any) {
        console.log(error)
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('person.email')) {
            return new Error('This email is already registered. Please choose another one.');
        }

        return new Error('Unexpected error trying to update the person.');


    }



}