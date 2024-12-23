import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import { API } from "../../api/api";
import { deleteTask } from "../../api/deleteTaskApi";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("TaskCard Component", () => {
  const mockTask = {
    id: 1,
    title: "Test Task",
    description: "This is a test task description",
    taskType: "Work",
    priority: "High",
    status: "Pending",
  };

  const mockOnDelete = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    global.fetch = jest.fn();
    window.confirm = jest.fn();
    global.alert = jest.fn();
  });

  test("renders task title", () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
  });

  test("renders task description", () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(screen.getByText(mockTask.description)).toBeInTheDocument();
  });

  test("renders task category", () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(
      screen.getByText(`Category: ${mockTask.taskType}`)
    ).toBeInTheDocument();
  });

  test("renders task priority", () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(
      screen.getByText(`Priority: ${mockTask.priority}`)
    ).toBeInTheDocument();
  });

  test("renders task status", () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(screen.getByText(`Status: ${mockTask.status}`)).toBeInTheDocument();
  });

  test("does not render incorrect task status", () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    expect(screen.queryByText("Status: Completed")).toBeNull();
  });

  test("calls navigate function on Edit button click", () => {
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    const editButton = screen.getByText("Edit");

    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith("/addtask", {
      state: { task: mockTask },
    });
  });

  test("does not call onDelete if delete confirmation is cancelled", () => {
    window.confirm = jest.fn().mockReturnValue(false);
    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  test("handles successful task deletion", async () => {
    window.confirm = jest.fn().mockReturnValue(true);
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<TaskCard task={mockTask} onDelete={mockOnDelete} />);
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(`${API}/task/${mockTask.id}`, {
        method: "DELETE",
      });
      expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
    });
  });
});
