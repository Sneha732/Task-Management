import React, { useState, useEffect } from "react";  // add useEffect here
import styled, { createGlobalStyle } from "styled-components";
import { Dashboard } from "./components/Dashboard";
import { TaskList } from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f5f7fa;
    color: #333;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media (max-width: 480px) {
    h1, h2, h3 {
      font-size: 1.1rem;
    }
    p, button {
      font-size: 0.85rem;
    }
  }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.nav`
  width: 280px;
  background-color: #2f3e46;
  color: #edf2f4;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem;
    overflow-x: auto;
  }
`;

const SidebarTitle = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  color: #ef476f;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 0;
    flex: 1;
    text-align: center;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const SidebarItem = styled.button`
  background: none;
  border: none;
  color: #ccd5ae;
  margin: 0.5rem 0;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.7rem 0;
  border-left: 4px solid transparent;
  transition: all 0.3s ease;

  &:hover,
  &.active {
    color: #ef476f;
    border-left: 4px solid #ef476f;
    background-color: rgba(239, 71, 111, 0.1);
  }

  @media (max-width: 768px) {
    margin: 0 0.5rem;
    border-left: none;
    border-bottom: 4px solid transparent;
    padding: 0.3rem 0.5rem;
    font-size: 0.9rem;
    white-space: nowrap;

    &:hover,
    &.active {
      border-bottom: 4px solid #ef476f;
      border-left: none;
      background-color: transparent;
    }
  }
`;

const Main = styled.main`
  flex: 1;
  background-color: #f5f7fa;
  padding: 2rem 3rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Load tasks from localStorage or start empty
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Save tasks to localStorage on every tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const openAddTaskForm = () => {
    setTaskToEdit(null);
    setIsTaskFormOpen(true);
  };
  const openEditTaskForm = (task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };
  
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };
  const closeTaskForm = () => setIsTaskFormOpen(false);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Sidebar>
          <SidebarTitle>GBM SoftTech</SidebarTitle>
          <SidebarItem
            className={currentTab === "dashboard" ? "active" : ""}
            onClick={() => setCurrentTab("dashboard")}
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            className={currentTab === "tasks" ? "active" : ""}
            onClick={() => setCurrentTab("tasks")}
          >
            Tasks
          </SidebarItem>
          <SidebarItem onClick={openAddTaskForm}>+ Add Task</SidebarItem>
        </Sidebar>
        <Main>
          {currentTab === "dashboard" && <Dashboard tasks={tasks} />}
          {currentTab === "tasks" && (
            <TaskList tasks={tasks} onEdit={openEditTaskForm}   onDelete={handleDeleteTask} />
          )}
        </Main>
        {isTaskFormOpen && (
          <TaskForm
            task={taskToEdit}
            onClose={closeTaskForm}
            onSave={(newTask) => {
              if (taskToEdit) {
                setTasks((prev) =>
                  prev.map((t) => (t.id === newTask.id ? newTask : t))
                );
              } else {
                setTasks((prev) => [
                  ...prev,
                  { ...newTask, id: Date.now().toString() },
                ]);
              }
              closeTaskForm();
            }}
          />
        )}
      </Container>
    </>
  );
}

export default App;
