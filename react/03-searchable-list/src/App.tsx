import "./App.css";
import { SearchableList } from "./components/SearchableList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Searchable List</h1>
      <SearchableList />
    </QueryClientProvider>
  );
}

export default App;
