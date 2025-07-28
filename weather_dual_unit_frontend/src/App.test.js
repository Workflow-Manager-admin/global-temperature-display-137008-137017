import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import App from "./App";

// Helper: set up global fetch mock
function createFetchMock(result, ok = true, delayMs = 0) {
  return jest.fn(() =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            ok,
            json: async () => result,
          }),
        delayMs
      )
    )
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn((success) =>
      success({ coords: { latitude: 50, longitude: 60 } })
    ),
  };
  process.env.REACT_APP_WEATHER_API_KEY = "fake-key";
});

describe("App", () => {
  it("renders minimalist UI: dropdown, weather display, and theme toggle", () => {
    render(<App />);
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /switch/i })).toBeInTheDocument();
    // Minimal structure: card panel, footer text present
    expect(screen.getByText(/powered by openweathermap/i)).toBeInTheDocument();
  });

  it("fetches weather for local location (auto-geolocation)", async () => {
    global.fetch = createFetchMock({
      main: { temp: 22 },
      name: "User City",
    });
    render(<App />);
    // Loading spinner appears
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();

    // The test will rerun after fetch
    await waitFor(() => {
      expect(screen.getByText("User City")).toBeInTheDocument();
    });
    // Shows both C° and F° side by side
    expect(screen.getByText(/22.*°C/)).toBeInTheDocument();
    expect(screen.getByText(/71.*°F/)).toBeInTheDocument();
  });

  it("shows proper city, Celsius, and Fahrenheit for preset dropdown location", async () => {
    global.fetch = createFetchMock({
      main: { temp: 10 }, // Celsius
      name: "London",
    });
    render(<App />);
    // Change dropdown to London which is index 2
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 2 },
    });
    await waitFor(() => expect(screen.getByText("London")).toBeInTheDocument());
    // Both units present
    expect(screen.getByText(/10.*°C/)).toBeInTheDocument();
    expect(screen.getByText(/50.*°F/)).toBeInTheDocument();
  });

  it("shows loading spinner while fetching and hides it after", async () => {
    global.fetch = createFetchMock(
      { main: { temp: 25 }, name: "Paris" },
      true,
      40
    );
    render(<App />);
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 5 }, // Paris index
    });
    // Loading immediately after change
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Paris")).toBeInTheDocument());
  });

  it("handles fetch error by showing message", async () => {
    // Simulate network error from API for city
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    render(<App />);
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 2 }, // London
    });
    await waitFor(() =>
      expect(
        screen.getByText(/there was an error fetching weather data/i)
      ).toBeInTheDocument()
    );
    expect(screen.queryByText(/\d+°C/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\d+°F/)).not.toBeInTheDocument();
  });

  it("shows error when no API key is set", async () => {
    delete process.env.REACT_APP_WEATHER_API_KEY;
    global.fetch = createFetchMock({ main: { temp: 23 }, name: "Tokyo" });
    render(<App />);
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 3 }, // Tokyo
    });
    await waitFor(() =>
      expect(
        screen.getByText(/api key is missing/i)
      ).toBeInTheDocument()
    );
  });

  it("shows geolocation error message", async () => {
    window.navigator.geolocation.getCurrentPosition = jest.fn(
      (_success, fail) => fail({ code: 1 })
    );
    render(<App />);
    await waitFor(() =>
      expect(
        screen.getByText(/please enable location access/i)
      ).toBeInTheDocument()
    );
  });

  it("toggles dark/light theme via theme toggle button", () => {
    render(<App />);
    const btn = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    fireEvent.click(btn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    fireEvent.click(screen.getByRole("button", { name: /switch to light mode/i }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("matches minimalist responsive layout", () => {
    render(<App />);
    // Main panel has 'main-card' class, single dropdown, no extraneous UI
    const mainCard = document.querySelector(".main-card");
    expect(mainCard).toBeInTheDocument();
    // Responsive: card width is not exceeding max-width (css validates)
    expect(mainCard.style.maxWidth || mainCard.getAttribute("style")).toMatch(/380|400/);
    // Should be no excessive UI clutter (e.g. single select, one panel, one toggle)
    expect(document.querySelectorAll("select").length).toBe(1);
    expect(document.querySelectorAll(".theme-toggle").length).toBe(1);
  });

  it("shows 'No weather data' when temperature is missing", async () => {
    global.fetch = createFetchMock({ main: {}, name: "" });
    render(<App />);
    // Manual override: call render with missing temp values
    await waitFor(() =>
      expect(screen.getByText(/no weather data/i)).toBeInTheDocument()
    );
  });
});

