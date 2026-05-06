import "./App.css";
import { FlightSearch } from "./components/FlightSearch";
import { FlightWizard } from "./components/FlightWizard";
import { ThemeToggle } from "./components/ThemeToggle";
import { ThemeProvider } from "./context/ThemeContext";
// import { FlightList } from "./components/FlightList";
// import { SeatSelector } from "./components/SeatSelector";
// import { useFlights } from "./hooks/useFlights";

function App() {
  // const { data, loading } = useFlights("/api/flights");

  // const seatMap = [
  //   ["occupied", "available", "available"], // fila 1
  //   ["available", "occupied", "available"], // fila 2
  //   ["exit", "exit", "exit"], // fila 3 (emergencia)
  //   ["available", "available", "occupied"], // fila 4
  //   ["occupied", "available", "available"], // fila 5
  // ];

  return (
    <ThemeProvider>
      {/* {data && <FlightList flights={data || []} />} */}
      {/* {loading && <div>Loading...</div>} */}

      {/* <SeatSelector seats={seatMap} /> */}
      <ThemeToggle />
      <FlightSearch />
      <FlightWizard />
    </ThemeProvider>
  );
}

export default App;
