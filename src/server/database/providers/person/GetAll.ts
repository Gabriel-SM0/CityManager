import { IPerson } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../index";

export const getAll = async (page: number, limit: number, filter: string): Promise<IPerson[] | Error> => {

    try { 
        const result = await Knex(ETableNames.person)
        .select('*')
        .orWhere('fullName', 'like', `%${filter}%`)
        .offset((page-1) * limit)
        .limit(limit);

        return result;

    } catch (error) {
        console.log(error)
        throw new Error('Error trying to get all person on the data base');
    } 

}