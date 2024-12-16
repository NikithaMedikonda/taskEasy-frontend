import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserProvider, useUserContext } from "./UserContext";

const TestComponent: React.FC = () => {
  const { user, setUser } = useUserContext();

  return (
    <div>
      <div data-testid="username">
        {user ? `Username: ${user.username}` : "No user"}
      </div>
      <button
        data-testid="setUserButton"
        onClick={() => setUser({ id: 1, username: "TestUser" })}
      >
        Set User
      </button>
      <button data-testid="clearUserButton" onClick={() => setUser(null)}>
        Clear User
      </button>
    </div>
  );
};

describe("UserContext", () => {
  test("provides a null user by default", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const usernameDisplay = screen.getByTestId("username");
    expect(usernameDisplay).toHaveTextContent("No user");
  });

  test("updates the user when setUser is called", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const setUserButton = screen.getByTestId("setUserButton");
    const usernameDisplay = screen.getByTestId("username");

    fireEvent.click(setUserButton); // Use fireEvent here
    expect(usernameDisplay).toHaveTextContent("Username: TestUser");
  });

  test("clears the user when setUser is called with null", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const setUserButton = screen.getByTestId("setUserButton");
    const clearUserButton = screen.getByTestId("clearUserButton");
    const usernameDisplay = screen.getByTestId("username");

    fireEvent.click(setUserButton);
    expect(usernameDisplay).toHaveTextContent("Username: TestUser");

    fireEvent.click(clearUserButton);
    expect(usernameDisplay).toHaveTextContent("No user");
  });

  test("throws error if useUserContext is used outside UserProvider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(); // Suppress console error for this test

    const TestErrorComponent: React.FC = () => {
      useUserContext();
      return null;
    };

    expect(() => render(<TestErrorComponent />)).toThrow(
      "useUserContext must be used within a UserProvider"
    );

    consoleError.mockRestore();
  });
});
