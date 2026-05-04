/**
 * 
 * @returns Construí un componente SeatSelector que:
• Reciba el seatMap del ejercicio 2 como prop
• Renderice cada asiento como un botón con color según su estado (verde = available, rojo = occupied,
amarillo = exit)
• Al hacer click en un asiento disponible, lo marque como 'selected' (azul) y muestre abajo: 'Asiento
seleccionado: fila X, columna Y'
• Solo se puede seleccionar un asiento a la vez
• Si el asiento está occupied o exit, el botón está deshabilitado
Estado inicial sugerido:
const [selectedSeat, setSelectedSeat] = useState(null);
// null | { row: number, col: number }
 */

import { useState } from "react";

export const SeatSelector = ({ seats }: { seats: string[][] }) => {
  const [selectedSeat, setSelectedSeat] = useState<null | {
    row: number;
    col: number;
  }>(null);

  const onSeatClick = (row: number, col: number) => {
    setSelectedSeat({ row, col });
  };
  return (
    <div className="seat-selector">
      {seats.map((row: string[], rowIndex: number) => {
        return (
          <div className="seat-selector__row">
            {row.map((seat, colIndex) => (
              <button
                className={
                  selectedSeat &&
                  selectedSeat.row === rowIndex &&
                  selectedSeat.col === colIndex
                    ? "selected"
                    : seat
                }
                disabled={["occupied", "exit"].includes(seat)}
                onClick={() => onSeatClick(rowIndex, colIndex)}
              ></button>
            ))}
          </div>
        );
      })}
      {selectedSeat && (
        <div>{`Asiento seleccionado: Fila ${selectedSeat.row + 1}, Columna ${selectedSeat.col + 1}`}</div>
      )}
    </div>
  );
};
