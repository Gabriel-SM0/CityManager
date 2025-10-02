import { IPerson } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../index";


export const getById = async (id:number) : Promise<IPerson | Error> => {
    try { 
        
        console.log(`Trying to get an element with ${id} from the database`)

        const result = await Knex(ETableNames.person)
        .select('*')
        .where('id', '=', id)
        .first();

        return result;
        
    } catch (error) {
        console.log(error)
        throw new Error('Error trying get one element with a get');

        
    } 

  

}