import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../pages/HomePage";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("HomePage", () => {
  test("should render the HomePage correctly", () => {
    render(<HomePage/>)
    expect(screen.getByText("Task Easy")).toBeInTheDocument();
    expect(screen.getByText("Let's Get Started!")).toBeInTheDocument();
  });

  test("should navigate to the Login page when the Login button is clicked", () => {
    render(<HomePage/>)
    fireEvent.click(screen.getByText("Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("should navigate to the Register page when the Register button is clicked", () => {
    render(<HomePage/>)
    fireEvent.click(screen.getByText("Register"));
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

});
