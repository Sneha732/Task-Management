import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { TaskItem } from "./TaskItem";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex-grow: 1;
  max-width: 280px;
  margin-bottom: 0.5rem;
  &:focus {
    outline: none;
    border-color: #ef476f;
  }
`;

const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-width: 160px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #ef476f;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export function TaskList({ tasks, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dueDateAsc");

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "dueDateAsc") {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === "dueDateDesc") {
          return new Date(b.dueDate) - new Date(a.dueDate);
        }
        if (sortBy === "priorityAsc") {
          const pMap = { Low: 1, Medium: 2, High: 3 };
          return pMap[a.priority] - pMap[b.priority];
        }
        if (sortBy === "priorityDesc") {
          const pMap = { Low: 1, Medium: 2, High: 3 };
          return pMap[b.priority] - pMap[a.priority];
        }
        return 0;
      });
  }, [tasks, searchTerm, sortBy]);

  return (
    <>
      <Header>
        <SearchInput
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SortSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort tasks"
        >
          <option value="dueDateAsc">Due Date ↑</option>
          <option value="dueDateDesc">Due Date ↓</option>
          <option value="priorityAsc">Priority ↑</option>
          <option value="priorityDesc">Priority ↓</option>
        </SortSelect>
      </Header>
      <List>
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
            />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </List>
    </>
  );
}
