const BASE_URL = 'https://69c54ec28a5b6e2dec2c2d87.mockapi.io'

export async function fetchGames() {
  const res = await fetch(`${BASE_URL}/games`)
  if (!res.ok){
    throw new Error('Failed to fetch games')
  }
  return res.json()
}