/**
 * 
 * @returns Construí un componente FlightSearch que:
• Tenga un input para ingresar un destino (texto libre)
• Al hacer submit de una búsqueda, fetchee vuelos de esta URL simulada:
const mockSearch = (destination) => new Promise(resolve =>
setTimeout(() => resolve(
flights.filter(f => f.route.includes(destination.toUpperCase()))
), 800)
);
• Muestre un loading skeleton mientras busca
• Muestre los resultados o 'No se encontraron vuelos' si el array está vacío
• Muestre un mensaje de error si el fetch falla
• El botón de búsqueda esté deshabilitado mientras carga
 */

import { useSearch } from "../hooks/useSearch";

interface Flight {
  id: number;
  origin: string;
  destination: string;
  price: number;
  airline: string;
  seats: number;
}

const flights: Flight[] = [
  {
    id: 1,
    origin: "BUE",
    destination: "MIA",
    price: 320,
    airline: "Aerolíneas",
    seats: 0,
  },
  {
    id: 2,
    origin: "BUE",
    destination: "MIA",
    price: 210,
    airline: "LATAM",
    seats: 3,
  },
  {
    id: 3,
    origin: "BUE",
    destination: "SCL",
    price: 180,
    airline: "LATAM",
    seats: 5,
  },
  {
    id: 4,
    origin: "BUE",
    destination: "MIA",
    price: 275,
    airline: "Aerolíneas",
    seats: 2,
  },
  {
    id: 5,
    origin: "BUE",
    destination: "SCL",
    price: 95,
    airline: "Sky",
    seats: 0,
  },
];

export const FlightSearch = () => {
  const mockSearch = (destination: string) =>
    new Promise<Flight[]>((resolve) =>
      setTimeout(
        () =>
          resolve(
            flights.filter((f) =>
              f.destination.includes(destination.toUpperCase()),
            ),
          ),
        800,
      ),
    );

  const { results, loading, error, search, onSearchChange, onSubmit } =
    useSearch(mockSearch);

  return (
    <div className="flight-search">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <button disabled={loading} onClick={onSubmit}>
        Buscar
      </button>
      {loading ? (
        <div className="loading-skeleton" />
      ) : (
        <div className="flight-search__list">
          {results.length > 0
            ? results.map((flight) => (
                <div className="flight-search__card">
                  <div className="flight-card__data">{flight.origin}</div>
                  <div className="flight-card__price">{flight.price}</div>
                </div>
              ))
            : "No se encontraron vuelos"}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};
