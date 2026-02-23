import { ICity } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";

export const getAll = async (page: number,limit: number,filter: string,id?: number): Promise<ICity[] | Error> => {

  try {

    const query = KnexConection(ETableNames.city)
      .select('*')
      .offset((page - 1) * limit)
      .limit(limit);

    if (id !== undefined) {
      query.where('id', '=', id);
    }

    if (filter) {
      query.where('name', 'like', `%${filter}%`);
    }

    return await query;

  } catch (error) {
    console.log(error);
    throw new Error('Error trying to get cities from database');
  }
};