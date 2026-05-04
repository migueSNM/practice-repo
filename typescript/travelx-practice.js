const passengers = [
  { id: 1, name: "Ana García", status: "confirmed", seat: "12A" },
  { id: 2, name: "Carlos López", status: "pending", seat: "14B" },
  { id: 3, name: "Laura Martínez", status: "confirmed", seat: "12B" },
  { id: 4, name: "Pedro Sánchez", status: "cancelled", seat: "16C" },
  { id: 5, name: "María Rodríguez", status: "confirmed", seat: "14A" },
];

const seatMap = [
  ["occupied", "available", "available"], // fila 1
  ["available", "occupied", "available"], // fila 2
  ["exit", "exit", "exit"], // fila 3 (emergencia)
  ["available", "available", "occupied"], // fila 4
  ["occupied", "available", "available"], // fila 5
];

const getConfirmedPassengers = (passengers) => {
  return passengers.filter((passenger) => passenger.status === "confirmed");
};

const getPassengerNames = (passengers) => {
  return passengers.map((passenger) => passenger.name);
};

const groupByStatus = (passengers) => {
  return passengers.reduce((acc, cur) => {
    if (!acc[cur.status]) {
      acc[cur.status] = [];
    }
    acc[cur.status].push(cur);
    return acc;
  }, {});
};

const findBySeat = (passengers, seat) => {
  const res = passengers.find((passenger) => passenger.seat === seat);
  return res ? res.name : null;
};

const countAvailableSeats = (seatMap) => {
  const res = seatMap.flat().filter((seat) => seat === "available");
  return res.length || 0;
};

const getAvailableSeats = (seatMap) => {
  return seatMap.reduce((acc, cur, rowIndex) => {
    for (const [colIndex, col] of cur.entries()) {
      if (col === "available") {
        acc.push({ row: rowIndex, col: colIndex });
      }
    }
    return acc;
  }, []);
};

const getSeat = (seats, row, col) => {
  return row in seats && col in seats[row] ? seats[row][col] : "invalid";
};

const hasExitRow = (seatMap) => {
  const res = seatMap.filter((row) => {
    return row.every((seat) => seat === "exit");
  });

  return res.length > 0;
};

const result1 = getConfirmedPassengers(passengers);
const result2 = getPassengerNames(passengers);
const result3 = groupByStatus(passengers);
const result4 = findBySeat(passengers, "16C");
const result5 = countAvailableSeats(seatMap);
const result6 = getAvailableSeats(seatMap);
const result7 = getSeat(seatMap, 10, 0);
const result8 = hasExitRow(seatMap);

const flights = [
  { id: 1, route: "BUE-MIA", price: 320, currency: "USD", stops: 0 },
  { id: 2, route: "BUE-SCL", price: 85000, currency: "ARS", stops: 1 },
  { id: 3, route: "BUE-GRU", price: 280, currency: "USD", stops: 0 },
  { id: 4, route: "BUE-BOG", price: 195, currency: "USD", stops: 2 },
  { id: 5, route: "BUE-LIM", price: 150000, currency: "ARS", stops: 1 },
];

const exchangeRates = { USD: 1, ARS: 0.001 }; // 1 ARS = 0.001 USD

/**
 * Escribí:
• normalizePrice(flight, rates) — devuelve el precio en USD
• sortByPrice(flights, rates) — ordena por precio normalizado de menor a mayor
• getDirectFlights(flights) — filtra vuelos sin escalas
• getCheapestFlight(flights, rates) — devuelve el vuelo más barato en USD
 */

const normalizePrice = (flight, rates) => {
  return flight.price * rates[flight.currency];
};

const sortByPrice = (flights, rates) => {
  return flights.sort(
    (a, b) => normalizePrice(a, rates) - normalizePrice(b, rates),
  );
};

const getDirectFlights = (flights) => {
  return flights.filter((flight) => flight.stops === 0);
};

const getCheapestFlight = (flights, rates) => {
  if(!flights.length){
    return null
  }

  return flights.reduce((acc, cur) => {
    return normalizePrice(cur, rates) < normalizePrice(acc, rates) ? cur : acc
  })
};

const sorted = sortByPrice(flights, exchangeRates);
const direct = getDirectFlights(flights);
const cheapest = getCheapestFlight(flights, exchangeRates)

console.log(cheapest);
