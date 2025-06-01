import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.25s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 20px rgba(239, 71, 111, 0.25);
  }
  flex-wrap: wrap;
`;

const Info = styled.div`
  flex: 1 1 65%;
  min-width: 260px;
`;

const Title = styled.h3`
  margin: 0 0 0.4rem 0;
  font-weight: 700;
  font-size: 1.2rem;
  color: #222;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  margin-top: 0.6rem;
`;

const Badge = styled.span`
  background-color: ${({ color }) => color || "#ddd"};
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
`;

const StatusBadge = styled(Badge)`
  background-color: ${({ status }) =>
    status === "completed" ? "#06d6a0" : "#ef476f"};
`;

const PriorityBadge = styled(Badge)`
  background-color: ${({ priority }) => {
    if (priority === "High") return "#ef476f";
    if (priority === "Medium") return "#ffd166";
    return "#06d6a0";
  }};
  color: ${({ priority }) => (priority === "Medium" ? "#333" : "#fff")};
`;

const DateInfo = styled.span`
  color: #666;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: 2px solid #ef476f;
  color: #ef476f;
  font-weight: 700;
  padding: 0.3rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background-color: #ef476f;
    color: #fff;
  }
`;

export function TaskItem({ task, onEdit, onDelete }) {
  return (
    <Card title="Click to edit task">
      <Info onClick={onEdit}>
        <Title>{task.title}</Title>
        <Description>{task.description}</Description>
        <Meta>
          <StatusBadge status={task.status}>
            {task.status === "completed" ? "Completed" : "Pending"}
          </StatusBadge>
          <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
          <DateInfo>Due: {new Date(task.dueDate).toLocaleDateString()}</DateInfo>
        </Meta>
      </Info>
      <ActionButtons>
        <ActionButton onClick={onEdit}>Edit</ActionButton>
        <ActionButton onClick={onDelete}>Delete</ActionButton>
      </ActionButtons>
    </Card>
  );
}
