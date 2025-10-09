import { ICity } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";

export const getById = async (id:number) : Promise<ICity | Error> => {

    try { 
        
        console.log(`Trying to get an element with ${id} from the database`)

        const result = await KnexConection(ETableNames.city)
        .select('*')
        .where('id', '=', id)
        .first();


        return result;


        
    } catch (error) {
        console.log(error)
        throw new Error('Error trying get one element with a get');

        
    } 

  

}