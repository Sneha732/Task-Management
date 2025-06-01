import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Statistics } from "./Statistics";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.8rem;
  color: #222;
  margin: 0;
`;

const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
 
  justify-content: flex-end;

  @media (max-width: 1034px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
     flex: 1;
  }
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;
  flex: 1 1 auto;   
  min-width: 180px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ef476f;
  }

  @media (max-width: 768px) {
    width: 100%;     
  }
`;



export function Dashboard({ tasks }) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // Filter tasks based on selected filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        filterStatus === "all" || task.status === filterStatus;
      const priorityMatch =
        filterPriority === "all" || task.priority === filterPriority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filterStatus, filterPriority]);

  return (
    <>
      <Header>
        <Title>Dashboard Overview</Title>
        <Filters>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Select>
          <Select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </Filters>
      </Header>
      <Statistics tasks={filteredTasks} />
    </>
  );
}

