
import { IPerson, IUser } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";


export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await KnexConection(ETableNames.user).insert(user).returning('id');

        console.log(`${JSON.stringify(result)} inserted on the database`)

        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;  
        }

        return new Error('Error trying to add one user on the data base')


    } catch (error: any) {
        return new Error(error.message)
    }
}

const createFunctionTest = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await KnexConection(ETableNames.user).insert(user).returning('id');
        /*

        [
        { id: 42},
        {id: 55}
        ]
        
        */

        if (typeof result === 'object') {
            return result.id;
        }

        return new Error('Error trying to add one user.')


    } catch (error: any) {
        return new Error(error.message)
    }

}


