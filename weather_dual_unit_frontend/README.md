# Minimalist Dual-Unit Weather App (weather_dual_unit_frontend)

This project is a minimalist, modern React web app that displays real-time temperature information for global cities and the user's current location, always showing both Celsius and Fahrenheit. It uses OpenWeatherMap as its data source, with a simple, responsive, always-on UI designed for clarity and speed.

## Features

- **Current location weather**: Uses browser geolocation (with permission) to display real-time temperature for the user's local area.
- **Preset location dropdown**: User can select from a dropdown list of major global cities; app instantly fetches and displays the temperature for the selected city.
- **Dual-unit display**: Temperatures are always shown in both Celsius and Fahrenheit, side by side.
- **Minimalist design**: Large, legible numbers; single-screen panel; modern dark/light theme toggle.
- **Auto theme**: Default is light with optional dark mode toggle.
- **Fully responsive**: Mobile, tablet, and desktop views are clean and adaptive.
- **Robust error and loading states**: Graceful handling of API errors, missing geolocation/API key, and no-data cases.
- **Privacy respect**: User location data is not sent to any backend aside from the direct API call (no server storage or analytics).

## Quickstart

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Get an OpenWeatherMap API key:**  
   Sign up at [openweathermap.org](https://openweathermap.org/api) and obtain a free API key.

3. **Environment Variables Setup:**
   Create a `.env` file at the root of this app with the following content:
   ```
   REACT_APP_WEATHER_API_KEY=your_openweather_api_key_here
   ```
   _Never commit your real API key to version control!_

4. **Run the app:**
   ```bash
   npm start
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

Major files in `src/`:
- `App.js` — Main application logic and layout
- `WeatherDisplay.js` — Dual-unit temperature display and UI
- `LocationDropdown.js` — Dropdown selector for locations
- `api.js` — Helper for weather API calls and geolocation
- `App.css` — Theme variables and layout styles
- `*.test.js` — Comprehensive test suites (Jest + RTL)
- `setupTests.js` — Jest DOM setup

## Environment Variables

- **REACT_APP_WEATHER_API_KEY**  
  _(Required)_  
  API key for accessing OpenWeatherMap.  
  Set in your `.env` file:
  ```
  REACT_APP_WEATHER_API_KEY=your_real_api_key_here
  ```
  If this is missing or incorrect, data fetching will fail and user-facing error will appear.

## Architectural Overview

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for visual block diagram and component details.

## Product Requirements

See [docs/PRD.md](docs/PRD.md) for full product requirements and user stories.

## Customization

- **Location list**: Edit the `PRESET_LOCATIONS` array in `src/api.js` to add or remove default dropdown cities.
- **Theming/colors**: Update CSS variables in `src/App.css`.
- **Branding**: Replace or customize the app layout/styles as needed for your organization.

## Testing

- All major UI and logic is covered via Jest and React Testing Library.
- To run all tests:
  ```
  npm test
  ```

## Deployment

To build for production:
```bash
npm run build
```
Deploy the contents of the `build` folder with your favorite static hosting (Netlify, Vercel, GitHub Pages, etc).

## Troubleshooting

- **API key errors**: Make sure `.env` exists and `REACT_APP_WEATHER_API_KEY` is valid (free tier is sufficient).
- **Geolocation issues**: User must permit geolocation access in their browser; if denied, only preset locations can be fetched.

---

© Kavia. See LICENSE for terms if included.
