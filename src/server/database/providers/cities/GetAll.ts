import { ICity } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICity[] | Error> => {

    try { 
        const result = await KnexConection(ETableNames.city)
        .select('*')
        .where('id', Number(id))
        .orWhere('name', 'like', `%${filter}%`)
        .offset((page-1) * limit)
        .limit(limit);



        if (id>0 && result.every(item => item.id !== id)) {
            const resultById = await KnexConection(ETableNames.city)
            .select('*')
            .where('id', '=', id)
            .first();

            if (resultById) return [...result, resultById];
        }

        return result;

       
    } catch (error) {
        console.log(error)
        throw new Error('Error trying to add one city on the data base');

        
    } 

  

}