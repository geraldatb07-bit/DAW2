import { Country } from "../Country/country";

export interface User{
    id: string;
    email: string;
    country: Country; //FK
}