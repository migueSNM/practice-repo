export interface Country {
  name: string;
  flag: string;
  population: number | null;
  capital: string;
  languages: string[] | null;
  currencies: string[] | null;
}

export interface Weather {
  temperature: number | null;
  description: string;
}
