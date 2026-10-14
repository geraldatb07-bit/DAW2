import { Country } from "../Country/country";
export interface User {
    email: string;
    country: Country; //FK
}