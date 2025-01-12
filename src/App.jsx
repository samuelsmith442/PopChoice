import React, { useState } from 'react';
import styled from 'styled-components';
import MovieForm from './components/MovieForm';
import Recommendation from './components/Recommendation';
import { querySimilarContent } from './utils/embeddings';

const Container = styled.div`
  min-height: 100vh;
  background: #000C36;  /* Updated to exact color */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto Slab', serif;
  color: #ffffff;
  padding: 20px;
`;

const AppContent = styled.div`
  max-width: 800px;
  width: 90%;
  padding: 2rem;
  text-align: center;
`;

const Logo = styled.div`
  margin-bottom: 2rem;
  img {
    width: 100px;
    height: auto;
  }
  h1 {
    font-family: 'Carter One', cursive;
    font-size: 3rem;
    margin: 0.5rem 0;
    color: #ffffff;
  }
`;

function App() {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (inputs) => {
    setLoading(true);
    try {
      console.log('Submitting with inputs:', inputs);
      const query = `${inputs.mood} movie ${inputs.era} similar to ${inputs.favoriteMovie}`;
      const recommendations = await querySimilarContent(query);
      
      if (recommendations && recommendations.length > 0) {
        setRecommendation(recommendations[0]);
      } else {
        throw new Error('No recommendations found');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <AppContent>
        <Logo>
          <img src="/images/popcorn.png" alt="PopChoice logo" />
          <h1>PopChoice</h1>
        </Logo>
        
        {!recommendation ? (
          <MovieForm onSubmit={handleSubmit} loading={loading} />
        ) : (
          <Recommendation 
            movie={recommendation} 
            onReset={() => setRecommendation(null)} 
          />
        )}
      </AppContent>
    </Container>
  );
}

export default App;
