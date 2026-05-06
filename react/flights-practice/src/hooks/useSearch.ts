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

// Reescribí el componente FlightSearch del ejercicio 5 usando useReducer en lugar de múltiples useState. El
// estado debe ser:
// const initialState = {
// query: '',
// results: [],
// loading: false,
// error: null,
// };
// Acciones a manejar:
// • SET_QUERY — actualiza el texto del input
// • FETCH_START — activa loading, limpia error
// • FETCH_SUCCESS — guarda resultados, desactiva loading
// • FETCH_ERROR — guarda el error, desactiva loading
// • CLEAR — vuelve al estado inicial

import { useReducer } from "react";

type SearchAction =
  | { type: "SET_QUERY"; value: string }
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; value: unknown[] }
  | { type: "FETCH_ERROR"; value: string }
  | { type: "CLEAR" }

const initialState = {
  query: "",
  results: [] as unknown[],
  loading: false,
  error: null as string | null,
};

function reducer(state: typeof initialState, action: SearchAction) {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.value };
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, results: action.value };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.value };
    case "CLEAR":
      return initialState;
    default:
      return { ...state };
  }
}

export const useSearch = <T>(searchReq: (query: string) => Promise<T[]>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await searchReq(state.query);
      dispatch({ type: "FETCH_SUCCESS", value: res });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", value: error as string });
    }
  };

  const onSearchChange = (value: string) => {
    dispatch({ type: "SET_QUERY", value });
  };

  return {
    results: state.results,
    loading: state.loading,
    error: state.error,
    search: state.query,
    onSearchChange,
    onSubmit,
  };
};
