import React, { useState, useEffect } from "react";
import "./App.css";
import WeatherDisplay from "./WeatherDisplay";
import LocationDropdown from "./LocationDropdown";
import { PRESET_LOCATIONS, fetchWeatherByCoords, getUserGeolocation } from "./api";

// PUBLIC_INTERFACE
/**
 * Main app for dual-unit weather display.
 * - Shows current weather for selected or local location, with C/F units
 * - Dropdown for location selection (auto or preset cities)
 * - Clean, responsive, minimalist UI
 * - Handles loading, error, and no-data states
 */
function App() {
  const [theme, setTheme] = useState("light");
  const [selectedLocIndex, setSelectedLocIndex] = useState(0); // index in PRESET_LOCATIONS
  const [geo, setGeo] = useState({ lat: null, lon: null }); // for local geolocation
  const [weather, setWeather] = useState({ tempC: null, tempF: null, city: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Apply theme to html
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle location change
  useEffect(() => {
    let ignore = false;
    async function doFetch() {
      setError("");
      setWeather({ tempC: null, tempF: null, city: "" });
      setLoading(true);
      let lat, lon, cityDisplay = "";

      try {
        if (selectedLocIndex === 0) {
          // Auto geolocation
          const coords = await getUserGeolocation();
          lat = coords.lat;
          lon = coords.lon;
          cityDisplay = "Your Location";
        } else {
          lat = PRESET_LOCATIONS[selectedLocIndex].lat;
          lon = PRESET_LOCATIONS[selectedLocIndex].lon;
          cityDisplay = PRESET_LOCATIONS[selectedLocIndex].name;
        }

        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        if (!apiKey) throw new Error("Weather API key not set in .env");

        // Fetch weather info
        const w = await fetchWeatherByCoords(lat, lon, apiKey);
        if (!ignore) {
          setWeather({ tempC: w.tempC, tempF: w.tempF, city: w.city || cityDisplay });
          setLoading(false);
        }
      } catch (e) {
        if (!ignore) {
          setLoading(false);
          if (
            e.code === 1 // permission denied (geolocation)
          ) {
            setError("Please enable location access in your browser.");
          } else if (e.message && e.message.includes("API")) {
            setError("There was an error fetching weather data. Please try again.");
          } else if (e.message && e.message.includes("key")) {
            setError("API key is missing, please set REACT_APP_WEATHER_API_KEY in .env.");
          } else if (e.message && e.message.includes("supported")) {
            setError("Geolocation is not supported in this browser.");
          } else {
            setError("Error: " + e.message);
          }
          setWeather({ tempC: null, tempF: null, city: "" });
        }
      }
    }
    doFetch();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line
  }, [selectedLocIndex]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const onChangeDropdown = (newIndex) => {
    setSelectedLocIndex(newIndex);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ minHeight: "initial", paddingTop: 32, paddingBottom: 32 }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <div className="main-card"
          style={{
            background: "var(--bg-secondary)",
            borderRadius: 18,
            boxShadow: "0 2px 16px 0 rgba(30,40,55,0.08)",
            display: "inline-block",
            margin: "0 auto",
            padding: "32px 22px 22px 22px",
            minWidth: 300,
            maxWidth: 380,
            width: "100%",
          }}
        >
          <LocationDropdown selectedIndex={selectedLocIndex} onChange={onChangeDropdown} />
          <WeatherDisplay
            city={weather.city}
            tempC={weather.tempC}
            tempF={weather.tempF}
            loading={loading}
            error={error}
          />
          <div style={{ marginTop: 24 }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
              Powered by OpenWeatherMap. Location data never leaves your device.
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
