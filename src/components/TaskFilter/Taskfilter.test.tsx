import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskFilter from "./TaskFilter";

describe("TaskFilter Component", () => {
  const categories = ["all", "work", "personal"];
  const mockOnFilter = jest.fn();
  const mockOnSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders category buttons correctly", () => {
    render(
      <TaskFilter
        categories={categories}
        selectedCategory="all"
        onFilter={mockOnFilter}
        onSort={mockOnSort}
        sortOption=""
      />
    );

    categories.forEach((category) => {
      const button = screen.getByText(
        category.charAt(0).toUpperCase() + category.slice(1)
      );
      expect(button).toBeInTheDocument();
    });
  });

  test("applies active class to the selected category", () => {
    render(
      <TaskFilter
        categories={categories}
        selectedCategory="work"
        onFilter={mockOnFilter}
        onSort={mockOnSort}
        sortOption=""
      />
    );

    const activeButton = screen.getByText("Work");
    expect(activeButton).toHaveClass("filter-button-active");
  });

  test("calls onFilter when a category button is clicked", () => {
    render(
      <TaskFilter
        categories={categories}
        selectedCategory="all"
        onFilter={mockOnFilter}
        onSort={mockOnSort}
        sortOption=""
      />
    );

    const workButton = screen.getByText("Work");
    fireEvent.click(workButton);

    expect(mockOnFilter).toHaveBeenCalledWith("work");
  });

  test("renders sort dropdown with options", () => {
    render(
      <TaskFilter
        categories={categories}
        selectedCategory="all"
        onFilter={mockOnFilter}
        onSort={mockOnSort}
        sortOption=""
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Sort By");
    expect(options[1]).toHaveTextContent("Completion Status");
    expect(options[2]).toHaveTextContent("Priority");
  });

  test("calls onSort when a sort option is selected", () => {
    render(
      <TaskFilter
        categories={categories}
        selectedCategory="all"
        onFilter={mockOnFilter}
        onSort={mockOnSort}
        sortOption=""
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "priority" } });

    expect(mockOnSort).toHaveBeenCalledWith("priority");
  });

  test("sets the correct sort option value", () => {
    render(
      <TaskFilter
        categories={categories}
        selectedCategory="all"
        onFilter={mockOnFilter}
        onSort={mockOnSort}
        sortOption="completion"
      />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("completion");
  });
});
