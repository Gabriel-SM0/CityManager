
import { IUser } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";
import {PasswordCrypto} from "./../../../shared/services/PasswordCrypto"


export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {
    try {

        const hashedPassword = await PasswordCrypto.hashPassword(user.password);

        user.password = hashedPassword;
        //same way as did bellow, but i will stay with this above code just to have two different ways to do

        const [result] = await KnexConection(ETableNames.user).insert({...user, password: hashedPassword}).returning('id');

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


