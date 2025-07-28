# Architectural Overview & Environmental Configuration

## System Architecture

The app is a **single-page React frontend** that runs fully in the browser, fetching live weather data via public API and providing a direct, always-on user experience. There is no backend other than the external weather API.

### High-Level Component Diagram

```mermaid
flowchart TD
    User[/"User (Browser)"/]
    subgraph FE["weather_dual_unit_frontend (React SPA)"]
      AppJS["App.js<br/>Main Orchestrator"]
      LocationDropdown["LocationDropdown.js<br/>Dropdown UI"]
      WeatherDisplay["WeatherDisplay.js<br/>Temperature UI Panel"]
      APIJS["api.js<br/>Weather API Calls<br/>Geolocation"]
      Styles["App.css, index.css<br/>Themes & Layout"]
    end
    OpenWeather["OpenWeatherMap API"]
    Env[".env file<br/>REACT_APP_WEATHER_API_KEY"]

    User-->|Interacts|FE
    FE-->|HTTP GET<br/>Weather Data|OpenWeather
    AppJS-->|Uses|LocationDropdown
    AppJS-->|Uses|WeatherDisplay
    AppJS-->|Calls|APIJS
    AppJS-->|Reads|Env
    FE---Styles
    APIJS-->|Reads|Env
    APIJS-->|Sends lat/lon & API key|OpenWeather

    classDef core fill:#ff9800,stroke:#333,stroke-width:2px
    AppJS,APIJS,WeatherDisplay,LocationDropdown class core
```

### Component Map

- **App.js**: Root orchestrator; manages theme, state, location, and error/loading logic.
- **WeatherDisplay.js**: Receives city name and C/F temps as props, responsible for UI display.
- **LocationDropdown.js**: Dropdown for location; emits changes to App.
- **api.js**: Exports helpers:
    - `PRESET_LOCATIONS` (list of cities for dropdown)
    - `fetchWeatherByCoords(lat, lon, apiKey)` — fetches current temp from OpenWeatherMap.
    - `getUserGeolocation()` — wraps browser geolocation API.
- **App.css**: Variables for theming (light/dark), minimalist layout, and component styling.

### Data Flow

1. On load or change of selection, App gets selected location (auto or preset).
2. If "auto", `getUserGeolocation` is called; otherwise, preset coords used.
3. Temperature is fetched with API key from `.env` via `fetchWeatherByCoords`.
4. App passes city/temp props to WeatherDisplay; displays error/loading UI as needed.

---

## Environment Variables

All API credentials are managed via a `.env` file at the project root.

### Required

- **REACT_APP_WEATHER_API_KEY**

  _(Required for weather data fetching; see [OpenWeatherMap API](https://openweathermap.org/api) docs.)_

  Example `.env`:
  ```
  REACT_APP_WEATHER_API_KEY=your_openweather_api_key_here
  ```
  - This variable is **never** committed to version control.
  - Changing this value in `.env` requires restarting the dev server.

### Dev Environment Example

Create a file named `.env` in `weather_dual_unit_frontend/` with:

```
REACT_APP_WEATHER_API_KEY=your_api_key
```

---

## Error Handling

- Geolocation denial or failure: UI prompts user to enable geolocation or select a preset city.
- API key missing: App shows clear message and skips data fetching.
- API failure: App shows error panel.

---

## Security & Privacy Notes

- All location and API calls are done from the client browser; the app itself does not store, track, or log data.
- Your API key is visible to the frontend (required by OpenWeatherMap), so use free or limited-scope keys only and monitor usage.

---

## Directory Structure

```
weather_dual_unit_frontend/
  ├── README.md
  ├── package.json
  ├── .env.example     # Template file, safe to share (not included automatically)
  ├── src/
  │     ├── App.js
  │     ├── WeatherDisplay.js
  │     ├── LocationDropdown.js
  │     ├── api.js
  │     └── ...
  └── docs/
        ├── ARCHITECTURE.md
        └── PRD.md
```

## Additional References

- See [README.md](../README.md) for setup and customization.
- For UI/UX or technical clarifications, see in-code `PUBLIC_INTERFACE` doc comments.

---
