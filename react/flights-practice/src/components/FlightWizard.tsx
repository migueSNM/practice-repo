/**
 * 
 * @returns Construí un wizard de reserva de 3 pasos con useReducer:
Step 1: seleccionar vuelo de una lista hardcodeada de 3 opciones
Step 2: ingresar nombre del pasajero y número de documento
Step 3: pantalla de confirmación que muestra el resumen y un botón 'Confirmar reserva'
Estado del wizard:
const initialState = {
step: 1, // 1 | 2 | 3
selectedFlight: null,
passenger: { name: '', document: '' },
confirmed: false,
};
Acciones: SELECT_FLIGHT, SET_PASSENGER_FIELD, NEXT_STEP, PREV_STEP, CONFIRM.
Reglas: no se puede avanzar del step 1 sin vuelo seleccionado. No se puede avanzar del step 2 sin nombre
y documento
 */

import { useReducer } from "react";
import { flights } from "../mocks";

const initialState = {
  step: 1, // 1 | 2 | 3
  selectedFlight: null,
  passenger: { name: "", document: "" },
  confirmed: false,
};

function reducer(state: typeof initialState, action) {
  switch (action.type) {
    case "SELECT_FLIGHT":
      return { ...state, selectedFlight: action.value };
    case "SET_PASSENGER_FIELD":
      return { ...state, passenger: action.value };
    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };
    case "PREV_STEP":
      return { ...state, step: state.step - 1 };
    case "CONFIRM":
      return { ...state };

    default:
      return state;
  }
}

export const FlightWizard = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDisableNext = () => {
    if (state.step === 1 && state.selectedFlight === null) {
      return true;
    }

    if (state.step === 2) {
      if (!state.passenger.name || !state.passenger.document) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="flight-wizard">
      {state.step === 1 && (
        <div className="flight-wizard__list">
          {flights.map((flight) => (
            <div
              className={`flight-wizard__card ${state.selectedFlight?.id === flight.id ? "selected" : ""}`}
              onClick={() => dispatch({ type: "SELECT_FLIGHT", value: flight })}
            >
              <div>
                <p>{flight.destination}</p>
                <p>{flight.airline}</p>
              </div>
              <div>{flight.price}</div>
            </div>
          ))}
        </div>
      )}
      {state.step === 2 && (
        <div className="flight-wizard__passenger">
          <input
            onChange={(event) =>
              dispatch({
                type: "SET_PASSENGER_FIELD",
                value: {
                  name: event.target.value,
                  document: state.passenger.document,
                },
              })
            }
            value={state.passenger.name}
          />
          <input
            onChange={(event) =>
              dispatch({
                type: "SET_PASSENGER_FIELD",
                value: {
                  name: state.passenger.name,
                  document: event.target.value,
                },
              })
            }
            value={state.passenger.document}
          />
        </div>
      )}
      {state.step === 3 && (
        <div className="flight-wizard__confirmation">
          <p>{state.selectedFlight.destination}</p>
          <p>{state.passenger.name}</p>
          <p>{state.passenger.document}</p>
        </div>
      )}
      {state.step > 1 && (
        <button onClick={() => dispatch({ type: "PREV_STEP" })}>PREV</button>
      )}
      {state.step < 3 && (
        <button
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          disabled={handleDisableNext()}
        >
          NEXT
        </button>
      )}
      {state.step === 3 && <button>CONFIRM</button>}
    </div>
  );
};
