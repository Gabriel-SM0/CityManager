import { IPerson } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../index";

export const create = async (person:Omit<IPerson, 'id'>): Promise<number | Error> => {

    try { 

        const [{ count }] = await Knex(ETableNames.city)
        .where('id', '=', person.cityId)
        .count<[{ count: number }]>('* as count');


        if (count === 0) {
            return new Error("The city assocated with this  register were not found")
        }

        const [result] = await Knex(ETableNames.person).insert(person).returning('id');

        console.log(`${result} inserted on the database`)

        if (typeof result === 'object'){
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Error trying to add one person on the data base')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error trying to add one person on the data base');
      
    } 
  
}