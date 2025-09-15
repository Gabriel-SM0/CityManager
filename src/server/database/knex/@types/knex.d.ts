import { ICity } from "../../models";

declare module 'knex/types/tables' {
    interface tables {
    cities: ICity
        id:number;
        name: string;
        country: string;
        population: number;
}



}