import { IPerson } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";

export const create = async (person: Omit<IPerson, 'id'>): Promise<number | Error> => {

    try {

        const [{ count }] = await KnexConection(ETableNames.city)
            .where('id', '=', person.cityId)
            .count<[{ count: number }]>('* as count');


        if (count === 0) {
            return new Error("The city assocated with this register were not found")
        }

        const [result] = await KnexConection(ETableNames.person).insert(person).returning('id');

        console.log(`${JSON.stringify(result)} inserted on the database`)

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Error trying to add one person on the data base')

    } catch (error: any) {
        console.error(error);

        if (error.code === '23505') {
            if (error.detail?.includes('email')) {
                return new Error('This email is already registered. Please use a different one.');
            }
            return new Error('A record with this data already exists.');
        }

        if (error.code === 'SQLITE_CONSTRAINT') {
            if (error.message?.includes('email')) {
                return new Error('This email is already registered. Please use a different one.');
            }
            return new Error('Duplicate entry detected.');
        }

        return new Error('Unexpected error trying to add the person to the database.');
    }

}