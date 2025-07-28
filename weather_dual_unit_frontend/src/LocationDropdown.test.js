import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LocationDropdown from "./LocationDropdown";
import { PRESET_LOCATIONS } from "./api";

describe("LocationDropdown", () => {
  it("renders all preset locations", () => {
    render(<LocationDropdown selectedIndex={0} onChange={() => {}} />);
    PRESET_LOCATIONS.forEach((loc) =>
      expect(screen.getByText(loc.name)).toBeInTheDocument()
    );
  });

  it("highlights default selected index", () => {
    render(<LocationDropdown selectedIndex={2} onChange={() => {}} />);
    // Option with value="2" should be selected
    const select = screen.getByLabelText(/location/i);
    expect(select.value).toBe("2");
  });

  it("calls onChange with new index when user selects another location", () => {
    const onChange = jest.fn();
    render(<LocationDropdown selectedIndex={1} onChange={onChange} />);
    const select = screen.getByLabelText(/location/i);
    // Change to new value
    fireEvent.change(select, { target: { value: "4" } });
    expect(onChange).toHaveBeenCalledWith(4);
  });
});

