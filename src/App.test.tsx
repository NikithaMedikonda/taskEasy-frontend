import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/UserLogin", () => () => <div>Login Page</div>);
jest.mock("./pages/UserRegistration", () => () => (
  <div>Registration Page</div>
));

describe("App Routing and Context", () => {
  const renderWithProviders = () =>  render(<App />);

  test("should render the Login Page on the root route (/)", () => {
    window.history.pushState({}, "", "/");
    renderWithProviders();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("should navigate to the Registration Page when the route is /register", () => {
    window.history.pushState({}, "", "/register");
    renderWithProviders();
    expect(screen.getByText("Registration Page")).toBeInTheDocument();
  });
});
