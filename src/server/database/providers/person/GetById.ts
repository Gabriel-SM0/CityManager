import { IPerson } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";


export const getById = async (id: number): Promise<IPerson | Error> => {
    try {

        console.log(`Trying to get an element with ${id} from the database`)

        const result = await KnexConection(ETableNames.person)
            .select('*')
            .where('id', '=', id)
            .first();


        if (!result) {
            return new Error(`Person with ID ${id} not found`);
        }
        return result;

    } catch (error) {
        console.log(error)
        return new Error('Error trying get one element with a get');


    }



}