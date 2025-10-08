import { ETableNames } from "../../ETableNames";
import { Knex } from "../../index";

export const count = async (filter = '') : Promise<number | Error> => {

    try { 
        console.log(`Trying to cout all element with filter: ${filter ?? '(no filter sent)'} from the database`)

        const [{ count }] = await Knex(ETableNames.person)
        .where('fullName', 'like', `%${filter}%`)
        .count<[{ count: number }]>('* as count');

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error(`Error trying to count with filter ${filter}`)
       
    } catch (error) {
        console.log(error)
        throw new Error('Error trying get one element with a get');

        
    } 

  
}