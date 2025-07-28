import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDisplay from "./WeatherDisplay";

describe("WeatherDisplay", () => {
  it('shows loading spinner and text if loading is true', () => {
    render(<WeatherDisplay loading={true} city="" tempC={null} tempF={null} error="" />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message if error is set', () => {
    render(<WeatherDisplay loading={false} city="" tempC={null} tempF={null} error="Some error"/>);
    expect(screen.getByText(/some error/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /error/i })).toBeInTheDocument();
  });

  it('shows "No weather data" if city/temp is missing', () => {
    render(<WeatherDisplay loading={false} city="" tempC={null} tempF={null} error={""}/>);
    expect(screen.getByText(/no weather data/i)).toBeInTheDocument();
  });

  it('renders dual temperature (C/F) and city name when all present', () => {
    render(<WeatherDisplay loading={false} city="My City" tempC={15} tempF={59} error="" />);
    expect(screen.getByText("My City")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText(/°C/)).toBeInTheDocument();
    expect(screen.getByText("59")).toBeInTheDocument();
    expect(screen.getByText(/°F/)).toBeInTheDocument();
  });

  it('rounds numbers shown for tempC and tempF', () => {
    render(<WeatherDisplay loading={false} city="Rounded" tempC={12.7} tempF={54.8} error="" />);
    // Math.round(12.7) = 13, Math.round(54.8) = 55
    expect(screen.getByText("13")).toBeInTheDocument();
    expect(screen.getByText("55")).toBeInTheDocument();
  });
});

