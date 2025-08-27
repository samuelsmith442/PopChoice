import React from 'react';
import styled from 'styled-components';

const RecommendationContainer = styled.div`
  text-align: center;
  animation: fadeIn 0.5s ease-in;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.6rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
  }
`;

const MovieCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  text-align: left;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:active {
    transform: translateY(-4px);
    border-color: #4ade80;
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;

    &:hover, &:active {
      transform: translateY(-2px); /* Less dramatic on mobile */
    }
  }
`;

const MovieTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: #4ade80;
  font-weight: bold;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const MovieMeta = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
  }
`;

const MovieDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const ResetButton = styled.button`
  width: 100%;
  max-width: 300px;
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
  min-height: 48px;
  -webkit-tap-highlight-color: transparent;

  &:hover, &:active {
    transform: translateY(-2px);
    background: #22c55e;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1.2rem;
    font-size: 1.3rem;
    min-height: 52px;
  }

  @media (max-width: 480px) {
    padding: 1.4rem;
    font-size: 1.2rem;
    min-height: 56px;
    border-radius: 12px;
  }
`;

function Recommendation({ movies, onReset }) {
  // Parse movie data for better display
  const parseMovie = (movieContent) => {
    const lines = movieContent.split('\n');
    const titleLine = lines[0];
    const description = lines.slice(1).join(' ').trim();

    // Extract title and metadata
    const [titlePart, ...metaParts] = titleLine.split('|');
    const title = titlePart.split(':')[0].trim();
    const year = titlePart.includes(':') ? titlePart.split(':')[1].trim() : '';
    const meta = metaParts.join(' | ').trim();

    return { title, year, meta, description };
  };

  return (
    <RecommendationContainer>
      <Header>
        <h2>🎬 Your Movie Recommendations</h2>
        <p>Here are {movies.length} movies we think you'll love!</p>
      </Header>

      <MoviesGrid>
        {movies.map((movie, index) => {
          const parsed = parseMovie(movie.content);
          return (
            <MovieCard key={index}>
              <MovieTitle>{parsed.title}</MovieTitle>
              {parsed.meta && <MovieMeta>{parsed.meta}</MovieMeta>}
              <MovieDescription>{parsed.description}</MovieDescription>
            </MovieCard>
          );
        })}
      </MoviesGrid>

      <ResetButton onClick={onReset}>🔄 Find More Movies</ResetButton>
    </RecommendationContainer>
  );
}

export default Recommendation;
