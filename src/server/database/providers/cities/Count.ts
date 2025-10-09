import { ICity } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";

export const count = async (filter = '') : Promise<number | Error> => {

    try { 
        
        console.log(`Trying to cout all element with filer:${filter} from the database`)

        const [{ count }] = await KnexConection(ETableNames.city)
        .where('name', 'like', `%${filter}%`)
        .count<[{ count: number }]>('* as count');

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error(`Error trying to count with filter ${filter}`)
        
       
    } catch (error) {
        console.log(error)
        throw new Error('Error trying get one element with a get');

        
    } 

  

}