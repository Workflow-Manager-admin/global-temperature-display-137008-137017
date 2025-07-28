//
// api.js - Public interface for weather/location API fetching for WeatherDualUnitFrontend
//

// PUBLIC_INTERFACE
/**
 * Preset list of global city locations for dropdown selection.
 * Each item: { name: string, lat: number, lon: number }
 */
export const PRESET_LOCATIONS = [
  { name: "Your Location (Auto)", lat: null, lon: null },
  { name: "New York, US", lat: 40.7128, lon: -74.0060 },
  { name: "London, UK", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo, JP", lat: 35.6895, lon: 139.6917 },
  { name: "Sydney, AU", lat: -33.8688, lon: 151.2093 },
  { name: "Paris, FR", lat: 48.8566, lon: 2.3522 },
  { name: "Delhi, IN", lat: 28.6139, lon: 77.2090 },
];

/**
 * Fetches current weather data for a geo coordinate using OpenWeatherMap's API.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} apiKey - Weather API key
 * @returns {Promise<{tempC: number, tempF: number, city: string}>} Weather info in Celsius and Fahrenheit and city name
 */
export async function fetchWeatherByCoords(lat, lon, apiKey) {
  // Using OpenWeatherMap's current weather endpoint, units=metric for Celsius
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Weather API error");
  }
  const data = await res.json();
  const tempC = data.main.temp;
  const tempF = (tempC * 9) / 5 + 32;
  return { tempC, tempF, city: data.name };
}

/**
 * Request the user's geolocation in the browser.
 * @returns {Promise<{lat: number, lon: number}>} Resolves with coordinates, or rejects with error
 */
export function getUserGeolocation() {
  return new Promise((resolve, reject) => {
    if (!window.navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    window.navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      (err) => reject(err),
      { timeout: 7000 }
    );
  });
}
