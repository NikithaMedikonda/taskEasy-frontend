import { render, screen, fireEvent } from '@testing-library/react';
import UserLoginPage from '../pages/UserLogin';

global.fetch = jest.fn();

describe("LoginPage Component", () => {
    beforeAll(() => {
        window.alert = jest.fn();  
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    test("renders username and password inputs and submit button", () => {
        render(<UserLoginPage/>)
        expect(screen.getByText("Welcome Back to TaskEasy!!")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });

    test("updates username and password state on input change", () => {
        render(<UserLoginPage/>)
        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: "Nikitha" } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: "1234" } });

        expect(screen.getByPlaceholderText(/Username/i)).toHaveValue("Nikitha");
        expect(screen.getByPlaceholderText(/Password/i)).toHaveValue("1234");
    });
});
