/**
 * 
 * @returns Extraé la lógica de fetch del ejercicio 5 en un custom hook useSearch(searchFn) que:
• Reciba cualquier función async como parámetro
• Devuelva { results, loading, error, search }
• search(query) dispara la búsqueda
• Maneje loading, error y resultados correctamente
El componente FlightSearch debería quedar así de simple:
const { results, loading, error, search } = useSearch(mockSearch);
// y el JSX maneja el resto
 */

import { useState } from "react";

export const useSearch = <T>(searchReq: (query: string) => Promise<T[]>) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await searchReq(search);
      setData(res)
    } catch (error) {
      setError(error as string)
    } finally {
      setLoading(false);
    }
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
  };

  return {
    results: data,
    loading,
    error,
    search,
    onSearchChange,
    onSubmit
  };
};
