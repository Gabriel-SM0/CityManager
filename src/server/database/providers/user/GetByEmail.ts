import { IUser } from "../../models";
import { ETableNames } from "../../ETableNames";
import { KnexConection } from "../../index";


export const getByEmail = async (email: string): Promise<IUser | Error> => {

    try {

        const result = await KnexConection(ETableNames.user)
            .select("*")
            .where('email', '=', email)
            .first();

        /*
        {id: 1,
        name: Bob,
        email: bob1@a.com
        }
        */

        if (result) {
            return result;
        }

        return new Error("Error trying to get an user with a email")

    } catch (error: any) {
        return new Error(error.message)
    }

}
