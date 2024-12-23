import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserLoginPage from "./UserLogin";
import { UserProvider } from "../../context/UserContext";

global.fetch = jest.fn();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginPage Component", () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders username and password inputs and submit button", () => {
    render(
      <UserProvider>
        <UserLoginPage />
      </UserProvider>
    );
    expect(screen.getByText("Welcome Back to TaskEasy!!")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("updates username and password state on input change", () => {
    render(
      <UserProvider>
        <UserLoginPage />
      </UserProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "Nikitha" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "1234" },
    });

    expect(screen.getByPlaceholderText(/Username/i)).toHaveValue("Nikitha");
    expect(screen.getByPlaceholderText(/Password/i)).toHaveValue("1234");
  });

  test("navigates to the registration page when clicking Register", () => {
    render(
      <UserProvider>
        <UserLoginPage />
      </UserProvider>
    );
    fireEvent.click(screen.getByText(/Register/i));

    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  test("logs in successfully and navigates to dashboard", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "Nikitha", token: "1234" }),
    });

    render(
      <UserProvider>
        <UserLoginPage />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "Nikitha" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard")
    );
  });

  test("displays alert when login fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Invalid Credentials" }) 
    });

    render(
      <UserProvider>
        <UserLoginPage />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "Nikitha" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Invalid Credentials"
      )
    );
  });

  test("displays alert when a network error occurs during login", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(
      <UserProvider>
        <UserLoginPage />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "Nikitha" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Network error"
      )
    );
  });

  test("displays validation error messages for username and password", async () => {
    render(
      <UserProvider>
        <UserLoginPage />
      </UserProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });
});
