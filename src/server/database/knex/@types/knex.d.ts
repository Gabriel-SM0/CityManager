import { ICity, IPerson } from "../../models";

declare module 'knex/types/tables' {
    interface tables {
    cities: ICity
    preson: IPerson
}



}