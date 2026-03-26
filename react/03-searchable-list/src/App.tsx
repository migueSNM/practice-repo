import "./App.css";
import { SearchableList } from "./components/SearchableList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoritesProvider } from "./context/favorites/provider";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <h1>Searchable List</h1>
        <SearchableList />
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;
