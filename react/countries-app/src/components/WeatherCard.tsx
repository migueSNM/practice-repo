import type { Weather } from "../types";

export const WeatherCard = ({ weather }: { weather: Weather }) => {
  return (
    <div className="weather-card">
      <p>{`Temp: ${weather.temperature}`}</p>
      <p>{weather.description}</p>
    </div>
  );
};
