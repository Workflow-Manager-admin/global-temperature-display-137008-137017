# Product Requirements Document (PRD)
## Project: Minimalist Weather App (Dual-Unit, Modern UI)

### Vision & Goals

Provide an ultra-simple, privacy-friendly weather display—always-on, dual-unit (Celsius and Fahrenheit), globally-aware, and instantly reactive to user location and major cities. The user receives clear feedback even in error and "no data" situations.

---

## Users & Personas

- **Everyday commuters:** Want to quickly check their current or target city’s temperature in both units.
- **Travelers & remote workers:** Need fast toggling between major global cities.
- **Science & education:** Consistent side-by-side units for international clarity.
- **Privacy-conscious users:** Prefer apps with no unnecessary tracking or analytics.

---

## Features

### Core Features

1. **Display local temperature in °F and °C**
   - Access browser geolocation upon user consent.
   - Show local city name if available, labeled "Your Location."
2. **Dropdown for preset global locations**
   - Include (at least): New York, London, Tokyo, Sydney, Paris, Delhi.
   - Remain at top of main card for quick switching.
3. **Dual-unit number display**
   - Always show both °C and °F side by side for selected location.
   - Numbers are large, well-contrasted, and minimalist.
4. **Robust loading, error, and no-data UI**
   - Feedback while fetching.
   - Guidance on error (e.g. API key missing, denied location).
   - "No data" state for edge cases.
5. **Theme toggle**
   - Light/dark toggle at top right with friendly icon.
   - Default to user’s system preference, fallback light.
6. **Responsive design**
   - Clean and presentable on mobile, tablet, and full desktop.
   - Card layout centered.
7. **API/Backend**
   - Fetch real-time weather from OpenWeatherMap (public REST).
   - Never persist user data (no backend beyond direct weather API call).

---

## User Stories

- _As a user, I want to instantly see my local temperature in both Celsius and Fahrenheit so I can relate to both units._
- _As a traveler, I want to switch quickly between popular world cities to check conditions abroad._
- _As a privacy-minded user, I want my rough location used only for the minimal data fetch and not stored or shared elsewhere._
- _As a visually-sensitive user, I want the numbers to be prominent and high contrast, and to have a simple way to toggle dark/light themes._

---

## Functional Requirements

- Must fetch and display temperature for current and preset locations.
- Service must not store any user data (privacy by design).
- Handle browser denial or lack of geolocation gracefully.
- Show clear error for missing/unset API key.
- Dual-unit (C/F) display must always be visible and accurate.

---

## Non-Functional Requirements

- Loads in < 2s over broadband; designed for low CPU/memory footprint.
- Fully responsive (phones, tablets, desktops).
- Accessible: uses ARIA labels and semantic HTML.
- Tested: 90%+ code coverage on core components and logic.

---

## Out of Scope

- No forecasts, no advanced weather data (just current temperature).
- No server-side rendering.
- No user login, registration, or history beyond present session (UI state).

---

## Environment Variables

**REACT_APP_WEATHER_API_KEY (required)**  
OpenWeatherMap API key. Obtain from [openweathermap.org/api](https://openweathermap.org/api).

---

## Acceptance Criteria

- App runs with a valid API key and displays correct temperatures for both local and dropdown locations.
- Fails gracefully and with clear error if API key is bad or missing.
- 90%+ test coverage on UI and logic.
- Meets all features as listed above.
