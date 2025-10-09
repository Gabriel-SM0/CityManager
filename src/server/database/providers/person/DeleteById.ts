import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";

export const deleteById = async (id: number): Promise<void | Error> => {

    try { 
        const result = await KnexConection(ETableNames.person)
        .where('id', '=', id)
        .del();

        if (result > 0) {
        console.log(`${id} deleted from database`);
        return;
        }

        return new Error('No register found to delete');

    } catch (error) {
        console.log(error)
        throw new Error('Error trying to delete one register');

        
    } 

  

}