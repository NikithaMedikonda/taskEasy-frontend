import { render, screen, fireEvent } from "@testing-library/react";
import UserRegistrationPage from "../pages/UserRegistration";
import { MemoryRouter } from "react-router-dom";

global.fetch = jest.fn();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("RegistrationPage Component", () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders input fields and submit button", () => {
    render(<UserRegistrationPage/>)
    expect(screen.getByText("Welcome to TaskEasy!!")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirm Password")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("updates input values on change", () => {
    render(<UserRegistrationPage/>)
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: "testUser" }, });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPassword" }, });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {  target: { value: "testPassword" }, });

    expect(screen.getByPlaceholderText(/Username/i)).toHaveValue("testUser");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("testPassword");
    expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue("testPassword");
  });

  test("navigates to the login page when clicking Login", () => {
    render(<UserRegistrationPage/>)
    fireEvent.click(screen.getByText(/Login/i));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
