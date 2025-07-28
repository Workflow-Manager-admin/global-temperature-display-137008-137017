import React from "react";

// PUBLIC_INTERFACE
/**
 * Displays weather info for a location in Celsius and Fahrenheit.
 * Handles loading, error, and no-data cases.
 * @param {object} props
 * @param {string} city
 * @param {number} tempC
 * @param {number} tempF
 * @param {boolean} loading
 * @param {string} error
 */
function WeatherDisplay({ city, tempC, tempF, loading, error }) {
  if (loading) {
    return (
      <div className="weather-panel loading">
        <span className="loader" aria-busy="true" aria-label="Loading"></span>
        <span style={{ fontSize: 18, color: "var(--text-secondary)" }}>Loading...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="weather-panel error" style={{ color: "#c62828" }}>
        <span role="img" aria-label="Error">⚠️</span> {error}
      </div>
    );
  }
  if (typeof tempC !== "number" || typeof tempF !== "number" || !city) {
    return (
      <div className="weather-panel no-data" style={{ color: "var(--text-secondary)" }}>
        No weather data.
      </div>
    );
  }

  return (
    <div className="weather-panel">
      <div className="city-name">{city}</div>
      <div className="temp-row" style={{ display: "flex", gap: 36, justifyContent: "center" }}>
        <div className="temp-box" style={{ fontSize: 48, fontWeight: 700 }}>
          {Math.round(tempC)}
          <span className="unit" style={{ fontSize: 22, fontWeight: 400, marginLeft: 4 }}>&deg;C</span>
        </div>
        <div className="temp-box" style={{ fontSize: 48, fontWeight: 700, color: "#ff9800" }}>
          {Math.round(tempF)}
          <span className="unit" style={{ fontSize: 22, fontWeight: 400, marginLeft: 4 }}>&deg;F</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;
