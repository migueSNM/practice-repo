const flights = [
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
  {
    id: 3,
    origin: "BUE",
    destination: "SCL",
    price: 180,
    airline: "LATAM",
    seats: 5,
  },
  {
    id: 4,
    origin: "BUE",
    destination: "MIA",
    price: 275,
    airline: "Aerolíneas",
    seats: 2,
  },
  {
    id: 5,
    origin: "BUE",
    destination: "SCL",
    price: 95,
    airline: "Sky",
    seats: 0,
  },
];

const swapOptions = [
  {
    id: 1,
    flightCode: "AR1045",
    departure: "2025-06-10T08:00:00",
    price: 310,
    duration: 180,
  },
  {
    id: 2,
    flightCode: "LA2030",
    departure: "2025-06-10T14:00:00",
    price: 210,
    duration: 240,
  },
  {
    id: 3,
    flightCode: "AR1050",
    departure: "2025-06-10T06:00:00",
    price: 410,
    duration: 160,
  },
  {
    id: 4,
    flightCode: "LA2035",
    departure: "2025-06-11T09:00:00",
    price: 195,
    duration: 210,
  },
  {
    id: 5,
    flightCode: "IB3010",
    departure: "2025-06-10T21:00:00",
    price: 260,
    duration: 195,
  },
];

/**
 * Escribí una función getAvailableFlights(flights, destination) que:

Filtre los vuelos por destino
Excluya los que no tienen asientos disponibles (seats === 0)
Devuelva el resultado ordenado por precio de menor a mayor

El output esperado para getAvailableFlights(flights, "MIA") sería:
javascript[
  { id: 2, origin: "BUE", destination: "MIA", price: 210, airline: "LATAM", seats: 3 },
  { id: 4, origin: "BUE", destination: "MIA", price: 275, airline: "Aerolíneas", seats: 2 },
]
 */

const getAvailableFlights = (flights, destination) => {
  return [...flights]
    .filter((flight) => flight.destination === destination && flight.seats > 0)
    .sort((a, b) => a.price - b.price);
};

/**
 * 
 * @param {*} flight 
 * Con el mismo array de vuelos, escribí una función groupByDestination(flights) que devuelva los vuelos agrupados por destino. El output esperado sería:
javascript{
  MIA: [
    { id: 1, origin: "BUE", destination: "MIA", price: 320, airline: "Aerolíneas", seats: 0 },
    { id: 2, origin: "BUE", destination: "MIA", price: 210, airline: "LATAM", seats: 3 },
    { id: 4, origin: "BUE", destination: "MIA", price: 275, airline: "Aerolíneas", seats: 2 },
  ],
  SCL: [
    { id: 3, origin: "BUE", destination: "SCL", price: 180, airline: "LATAM", seats: 5 },
    { id: 5, origin: "BUE", destination: "SCL", price: 95,  airline: "Sky", seats: 0 },
  ]
}
 */

const groupByDestination = (flights) => {
  return flights.reduce((acc, cur) => {
    return acc[cur.destination]
      ? { ...acc, [cur.destination]: [...acc[cur.destination], cur] }
      : { ...acc, [cur.destination]: [cur] };
  }, {});
};

/**
 * Escribí una función getBestSwapOption(options) que devuelva el vuelo más barato del día más próximo disponible. Si hay empate en precio, devolvés el de menor duración.
El output esperado sería el vuelo con id: 2 (el más barato del 2025-06-10, que es la fecha más próxima).
 */
const getBestSwapOption = (options) => {
  if (!options.length) return null;

  return options.reduce((acc, cur) => {
    if (cur.departure.slice(0, 10) < acc.departure.slice(0, 10)) {
      return cur;
    }
    if (cur.departure.slice(0, 10) === acc.departure.slice(0, 10)) {
      if (cur.price < acc.price) {
        return cur;
      } else if (cur.price === acc.price && cur.duration < acc.duration) {
        return cur;
      }
    }
    return acc;
  }, options[0]);
};

// const result1 = getAvailableFlights(flights, "MIA");
// const result2 = groupByDestination(flights);
// const result3 = getBestSwapOption(swapOptions);

// console.log(result3);

/**
 * 
 * @returns Escribí una función getFlightDetails() que:

Ejecute los tres fetches en paralelo
Combine los resultados en un solo array con este formato:

[
  { id: 1, destination: "MIA", price: 320, seats: 0 },
  { id: 2, destination: "SCL", price: 180, seats: 5 },
]

Mida e imprima en consola cuánto tardó en total (debería ser ~1000ms, no ~2400ms)

 */
const fetchFlights = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 1, destination: "MIA" },
          { id: 2, destination: "SCL" },
        ]),
      800,
    ),
  );

const fetchPrices = () =>
  new Promise((resolve) => setTimeout(() => resolve({ 1: 320, 2: 180 }), 600));

const fetchSeats = () =>
  new Promise((resolve) => setTimeout(() => resolve({ 1: 0, 2: 5 }), 1000));

const getFlightDetails = async () => {
  const [flights, prices, seats] = await Promise.all([
    fetchFlights(),
    fetchPrices(),
    fetchSeats(),
  ]);

  return flights.map((flight) => ({
    ...flight,
    price: prices[flight.id],
    seats: seats[flight.id],
  }));
};

const fetchFlightsPromises = async () => {
  const result7 = await getFlightDetails();
  console.log(result7)
};

fetchFlightsPromises()