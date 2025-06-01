import React from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(239, 71, 111, 0.1);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const StatCard = styled.div`
  flex: 1 1 180px;
  background: linear-gradient(135deg, #ef476f, #f78fb3);
  color: #fff;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  box-shadow: 0 8px 15px rgba(239, 71, 111, 0.3);
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  user-select: none;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const Label = styled.div`
  font-weight: 400;
  font-size: 1rem;
  margin-top: 0.4rem;
  opacity: 0.85;
`;

export function Statistics({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  return (
    <StatsContainer>
      <StatCard>
        {total}
        <Label>Total Tasks</Label>
      </StatCard>
      <StatCard>
        {completed}
        <Label>Completed Tasks</Label>
      </StatCard>
      <StatCard>
        {pending}
        <Label>Pending Tasks</Label>
      </StatCard>
    </StatsContainer>
  );
}
