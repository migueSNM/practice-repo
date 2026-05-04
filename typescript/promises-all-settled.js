const fetchFlights = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve([{ id: 1 }, { id: 2 }]), 500),
  );

const fetchPromotions = () =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Promotions service down")), 300),
  );

const fetchWeather = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ MIA: "sunny", SCL: "cloudy" }), 400),
  );

const loadDashboard = async () => {
  const [flights, promotions, weather] = await Promise.allSettled([
    fetchFlights(),
    fetchPromotions(),
    fetchWeather(),
  ]);

  return {
    flights: flights.status === "fulfilled" ? flights.value : null,
    promotions: promotions.status === "fulfilled" ? promotions.value : null,
    weather: weather.status === "fulfilled" ? weather.value : null,
  };
};

const runFetch = async () => {
  const result = await loadDashboard();
  console.log(result);
};

runFetch();
