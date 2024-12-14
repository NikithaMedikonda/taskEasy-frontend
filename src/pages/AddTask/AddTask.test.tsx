import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddTaskForm from "./AddTask";

describe("AddTaskForm Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form fields", () => {
    render(<AddTaskForm onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Priority")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i })
    ).toBeInTheDocument();
  });

  test("calls onSubmit with form data when submitted", async () => {
    render(<AddTaskForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "work" },
    });
    fireEvent.change(screen.getByLabelText("Priority"), {
      target: { value: "high" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Test Task",
      description: "Test Description",
      taskType: "work",
      priority: "high",
    });
  });

  test("resets the form after submission", async () => {
    render(<AddTaskForm onSubmit={mockOnSubmit} />);
    const titleInput = screen.getByLabelText("Title") as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(
      "Description"
    ) as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    });

    expect(titleInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });

  test("shows validation errors if required fields are not filled", async () => {
    render(<AddTaskForm onSubmit={mockOnSubmit} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /add task/i }));
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
