import React from "react";
import { PRESET_LOCATIONS } from "./api";

// PUBLIC_INTERFACE
/**
 * A dropdown to select a location (auto/local or global preset).
 * @param {object} props
 * @param {number} selectedIndex
 * @param {function} onChange
 */
function LocationDropdown({ selectedIndex, onChange }) {
  return (
    <div className="dropdown-container">
      <label htmlFor="location-select" className="dropdown-label" style={{ marginRight: 8, fontWeight: 600 }}>
        Location
      </label>
      <select
        id="location-select"
        value={selectedIndex}
        onChange={(e) => onChange(Number(e.target.value))}
        className="dropdown"
        aria-label="Select location"
      >
        {PRESET_LOCATIONS.map((loc, i) => (
          <option key={loc.name} value={i}>
            {loc.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LocationDropdown;
