import { useEffect, useState } from "react";
import type { Flight } from "../types";

const mockFetchFlights = (url: string): Promise<Flight[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "/api/flights") {
        resolve([
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
        ]);
      } else {
        reject(new Error("Not found"));
      }
    }, 1000);
  });

export const useFlights = (url: string) => {
  const [data, setData] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const flights = await mockFetchFlights(url);
        setData(flights);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
