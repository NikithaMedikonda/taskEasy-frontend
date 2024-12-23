import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom"; 
import DashboardHeader from "./DashBoardHeader";
import { UserProvider } from "../../context/UserContext";

const mockOnLogout = jest.fn();
const mockToggleProfileModal = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe("DashboardHeader", () => {
  beforeEach(() => {
    mockOnLogout.mockClear();
    mockToggleProfileModal.mockClear();
  });

  test("renders with username", () => {
    render(
      <UserProvider>
        <DashboardHeader
          username="JohnDoe"
          onLogout={mockOnLogout}
          toggleProfileModal={mockToggleProfileModal}
          showProfileModal={false}
        />
      </UserProvider>
    );

    expect(screen.getByText(/Welcome JohnDoe!! 👋/)).toBeInTheDocument();
  });

  test("navigates to add task page when 'Add New Task' button is clicked", () => {
    const mockNavigate = jest.fn();  
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);  

    render(
      <UserProvider>
        <DashboardHeader
          username="JohnDoe"
          onLogout={mockOnLogout}
          toggleProfileModal={mockToggleProfileModal}
          showProfileModal={false}
        />
      </UserProvider>
    );

    const addTaskButton = screen.getByText("＋ Add New Task");
    fireEvent.click(addTaskButton);

    expect(mockNavigate).toHaveBeenCalledWith("/addtask");
  });

  test("opens and closes profile modal when profile button is clicked", () => {
    render(
      <UserProvider>
        <DashboardHeader
          username="JohnDoe"
          onLogout={mockOnLogout}
          toggleProfileModal={mockToggleProfileModal}
          showProfileModal={false}
        />
      </UserProvider>
    );

    const profileButton = screen.getByText("👤");
    fireEvent.click(profileButton);
    expect(mockToggleProfileModal).toHaveBeenCalledTimes(1);

    render(
      <UserProvider>
        <DashboardHeader
          username="JohnDoe"
          onLogout={mockOnLogout}
          toggleProfileModal={mockToggleProfileModal}
          showProfileModal={true}
        />
      </UserProvider>
    );

    expect(screen.getByText("JohnDoe")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls onLogout when logout button is clicked", () => {
    render(
      <UserProvider>
        <DashboardHeader
          username="JohnDoe"
          onLogout={mockOnLogout}
          toggleProfileModal={mockToggleProfileModal}
          showProfileModal={true}
        />
      </UserProvider>
    );

    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});
