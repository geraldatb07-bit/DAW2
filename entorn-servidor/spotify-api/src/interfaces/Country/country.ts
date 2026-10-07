export interface Country {
    id: string;
    countryName: string;
}

export type CountryInput = Omit<Country, "id">;
