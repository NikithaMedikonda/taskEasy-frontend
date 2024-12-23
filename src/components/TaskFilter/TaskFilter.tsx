import React from "react";

interface TaskFilterProps {
  categories: string[];
  selectedCategory: string;
  onFilter: (category: string) => void;
  onSort: (option: string) => void;
  sortOption: string;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  categories,
  selectedCategory,
  onFilter,
  onSort,
  sortOption,
}) => {
  return (
    <div className="task-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-button ${
            selectedCategory === category ? "filter-button-active" : ""
          }`}
          onClick={() => onFilter(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}

      <select onChange={(e) => onSort(e.target.value)} value={sortOption}>
        <option value="">Sort By</option>
        <option value="completion">Completion Status</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default TaskFilter;
