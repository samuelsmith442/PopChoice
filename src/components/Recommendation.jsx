import React from 'react';
import styled from 'styled-components';

const RecommendationContainer = styled.div`
  text-align: center;
  animation: fadeIn 0.5s ease-in;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const Content = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #ffffff;
`;

const Button = styled.button`
  width: 100%;  /* Make button full width */
  padding: 1rem;
  font-size: 1.2rem;
  background: #4ade80;
  color: #0a0d24;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;
  font-family: 'Roboto Slab', serif;
  font-weight: bold;

  &:hover {
    transform: translateY(-2px);
    background: #22c55e;
  }
`;

function Recommendation({ movie, onReset }) {
  // Extract title if it contains a colon
  let title = movie.content;
  if (title.includes(':')) {
    title = title.split(':')[0];
  }

  return (
    <RecommendationContainer>
      <Title>{title}</Title>
      <Content>{movie.content}</Content>
      <Button onClick={onReset}>Go Again</Button>
    </RecommendationContainer>
  );
}

export default Recommendation;
