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
import { flights } from "../mocks";
import type { Flight } from "../types";

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
