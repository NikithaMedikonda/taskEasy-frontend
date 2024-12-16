import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserRegistrationPage from "./UserRegistration";
import { UserProvider } from "../../context/UserContext";

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
    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );
    expect(
      screen.getByText("Register an Account to TaskEasy!!")
    ).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("updates input values on change", () => {
    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "testPassword" },
    });

    expect(screen.getByPlaceholderText(/Username/i)).toHaveValue("testUser");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("testPassword");
    expect(screen.getByPlaceholderText("Confirm Password")).toHaveValue(
      "testPassword"
    );
  });

  test("navigates to the login page when clicking Login", () => {
    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );
    fireEvent.click(screen.getByText(/Login/i));

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("registers user and navigates to the dashboard on success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "testUser", token: "mockToken" }),
    });

    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: "testUser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPassword" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "testPassword" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/dashboard"));
  });

  test("shows alert if registration fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Registration failed",
    });

    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: "testUser" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "testPassword" } });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), { target: { value: "testPassword" } });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith("Error occured while registering"));
  });
  
  test("shows alert if fetch fails during registration", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));
  
    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testPassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "testPassword" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Error occured while fetching user details"
      );
    });
  });
  
  test("displays error messages when inputs are empty", async () => {
    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );
  
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
    expect(await screen.findByText("Username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Please confirm password!")
    ).toBeInTheDocument();
  });

  test("displays error when passwords do not match", async () => {
    render(
      <UserProvider>
        <UserRegistrationPage />
      </UserProvider>
    );
  
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "differentPassword" },
    });
  
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  
    expect(
      await screen.findByText("Passwords should match!")
    ).toBeInTheDocument();
  });
  
});
