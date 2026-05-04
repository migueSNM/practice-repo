import { useState } from "react";
import type { Flight } from "../types";
import { useDebounce } from "../hooks/useDebounce";

export const FlightList = ({ flights }: { flights: Flight[] }) => {
  const [search, setSearch] = useState("");

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  const debouncedSearch = useDebounce(search, 300);

  const filteredFlights =
    flights.length > 0
      ? flights.filter(
          (flight) =>
            flight.airline
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()) ||
            flight.destination
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase()),
        )
      : [];

  console.log({ flights });

  return (
    <div className="flight-list">
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="flight-list-input"
      />
      {filteredFlights.length > 0 ? (
        filteredFlights.map(({ id, airline, destination, price }) => (
          <div className="flight-list-card" key={id}>
            <div className="flight-list-card-data">
              <p className="flight-list-card-destination">{destination}</p>
              <p className="flight-list-card-airline">{airline}</p>
            </div>
            <p className="flight-list-card-price">{price}</p>
          </div>
        ))
      ) : (
        <div className="flight-list-not-found">No flights found</div>
      )}
    </div>
  );
};
