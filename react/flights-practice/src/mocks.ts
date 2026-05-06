import type { Flight } from "./types";

export const flights: Flight[] = [
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