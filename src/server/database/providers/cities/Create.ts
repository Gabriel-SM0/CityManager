import { ICity } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";

export const create = async (city:Omit<ICity, 'id'>): Promise<number | Error> => {

    try { 
        const [result] = await KnexConection(ETableNames.city).insert(city).returning('id');

        console.log(`${result} inserted on the database`)

        if (typeof result === 'object'){
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }

        return new Error('Error trying to add one city on the data base')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error trying to add one city on the data base');

        
    } 

  

}