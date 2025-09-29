import { ICity } from "../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../index";

export const updateById = async (id:number, city: Omit<ICity, 'id'>): Promise<void | Error> => {

    try { 
        console.log(`Trying to update the city with the id: ${id}.`)
        const result = await Knex(ETableNames.city)
        .update(city)
        .where('id', '=', id);

        if (result > 0) {
            console.log(`Update finished on id: ${id}.`)

            return;
        }

        return new Error('Error trying to UPDATE one city on the data base')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error trying to UPDATE one city on the data base');

        
    } 

  

}