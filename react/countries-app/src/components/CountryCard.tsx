import type { Country } from "../types";

//nombre, bandera, población, capital, idiomas, moneda
export const CountryCard = ({ country }: { country: Country }) => {
  const { name, flag, population, capital, languages, currencies } = country;
  return (
    <div className="card">
      <p className="card__title">
        {flag} {name}
      </p>
      <p className="card__subtitle">{capital}</p>
      <p className="card__label">Population</p>
      <p className="card__value">{population?.toLocaleString()}</p>
      <p className="card__label">Languages</p>
      <p className="card__value">{languages?.join(", ")}</p>
      <p className="card__label">Currencies</p>
      <p className="card__value">{currencies?.join(", ")}</p>
    </div>
  );
};
