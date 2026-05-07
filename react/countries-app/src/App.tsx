import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { CountryCard } from "./components/CountryCard";
import type { Country, Weather } from "./types";
import { WeatherCard } from "./components/WeatherCard";
import { WikiSummary } from "./components/WikiSummary";

interface State {
  country: Country;
  weather: Weather;
  summary: string;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  country: {
    name: "",
    flag: "",
    population: 0,
    capital: "",
    languages: null,
    currencies: null,
  },
  weather: {
    temperature: null,
    description: "",
  },
  summary: "",
  loading: false,
  error: null,
};

type ActionType =
  | {
      type: "SET_INFO";
      value: {
        name: string;
        flag: string;
        population: number;
        capital: string;
        languages: string[] | null;
        currencies: string[] | null;
      };
    }
  | {
      type: "SET_WEATHER";
      value: {
        temperature: number;
        weather: string;
      };
    }
  | {
      type: "SET_SUMMARY";
      value: string;
    }
  | { type: "NOT_FOUND" }
  | { type: "FETCH_START" }
  | { type: "FETCH_COMPLETE" }
  | { type: "FETCH_ERROR"; value: string };

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "SET_INFO":
      return {
        ...state,
        country: {
          name: action.value.name,
          flag: action.value.flag,
          population: action.value.population,
          capital: action.value.capital,
          languages: action.value.languages,
          currencies: action.value.currencies,
        },
      };
    case "SET_WEATHER":
      return {
        ...state,
        weather: {
          temperature: action.value.temperature,
          description: action.value.weather,
        },
      };
    case "SET_SUMMARY":
      return {
        ...state,
        summary: action.value,
      };
    case "FETCH_START":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_COMPLETE":
      return {
        ...state,
        loading: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.value,
      };
    case "NOT_FOUND":
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_START" });
        const [info, summary] = await Promise.allSettled([
          fetch(`https://restcountries.com/v3.1/name/${search}`),
          fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${search}`),
        ]);

        if (info.status === "fulfilled") {
          const infoResponse = await info.value.json();

          if (infoResponse?.status === 404) {
            return dispatch({
              type: "FETCH_ERROR",
              value: infoResponse.message,
            });
          }

          const countryData = infoResponse[0];

          dispatch({
            type: "SET_INFO",
            value: {
              name: countryData.name.official,
              flag: countryData.flag,
              population: countryData.population,
              capital: countryData.capital[0],
              languages: Object.values(countryData.languages),
              currencies: Object.keys(countryData.currencies),
            },
          });

          const weather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${countryData.latlng[0]}&longitude=${countryData.latlng[1]}&current=temperature_2m,weathercode,wind_speed_10m`,
          );

          const weatherData = await weather.json();

          if (weatherData) {
            dispatch({
              type: "SET_WEATHER",
              value: {
                temperature: weatherData.current.temperature_2m,
                weather: `${weatherData.current.weathercode}`,
              },
            });
          }
        }

        if (summary.status === "fulfilled") {
          const summaryData = await summary.value.json();

          dispatch({ type: "SET_SUMMARY", value: summaryData.extract });
        }

        dispatch({ type: "FETCH_COMPLETE" });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", value: error as string });
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="app">
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="search-input"
      />
      {!state.loading && <CountryCard country={state.country} />}
      {!state.loading && <WeatherCard weather={state.weather} />}
      {!state.loading && <WikiSummary summary={state.summary} />}
    </div>
  );
}

export default App;
