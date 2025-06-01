import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// Keyframe for smooth fade-in
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Overlay with backdrop blur for visual depth
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.4s ease-out forwards;
`;

// Main modal container with sleek background and border
const ModalContent = styled.div`
  background-color: black;
  color: white;
  box-shadow: 0 10px 30px rgba(51, 78, 104, 0.15);

  border-radius: 16px;
  width: 90%;
  max-width: 520px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(255, 102, 102, 0.3);
  color: white;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.4s ease-out;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

// Title
const ModalHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  text-align: center;
`;

// Form container
const ModalBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* keeps base gap */
  }

  form > div {
    margin-bottom: 0.75rem; /* adds extra space like label height */
  }

  input,
  textarea,
  select {
    /* existing styles */
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    background: #f5f5f5;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
    color: #333;

    &:focus {
      background: #fff;
      border-color: #007bff;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.15);
      outline: none;
    }
  }

  /* ... rest unchanged ... */
`;

// Action buttons container
const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;

  button {
    padding: 0.55rem 1.2rem;
    border-radius: 6px;
    border: none;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .cancel {
    background: #e0e0e0;
    color: #333;

    &:hover {
      background: #d0d0d0;
    }
  }

  .confirm {
    background: #007bff;
    color: #fff;
    box-shadow: 0 4px 14px rgba(0, 123, 255, 0.4);

    &:hover {
      background: #0069d9;
    }
  }
`;

// Close button for top-right corner
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;

const TaskForm = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: task ? task.id : Date.now().toString(),
      title,
      description,
      dueDate,
      status: task ? task.status : "pending",
      priority,
    };
    onSave(newTask);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalHeader>{task ? "Edit Task" : "Create Task"}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                id="title"
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                id="description"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            {task && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <div>
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={(e) =>
                      onSave({
                        ...task,
                        status: e.target.checked ? "completed" : "pending",
                      })
                    }
                  />
                </div>
                <div>Mark as completed</div>
              </div>
            )}

            <ModalActions>
              <button type="button" className="cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="confirm">
                Save
              </button>
            </ModalActions>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TaskForm;
