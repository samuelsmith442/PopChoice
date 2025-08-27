import React, { useState } from 'react';
import styled from 'styled-components';
import MovieForm from './components/MovieForm';
import Recommendation from './components/Recommendation';
import { querySimilarContent } from './utils/embeddings';

const Container = styled.div`
  min-height: 100vh;
  background: #000C36;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Roboto Slab', serif;
  color: #ffffff;
  padding: 1rem;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 0.5rem;
    align-items: center;
  }
`;

const AppContent = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const Logo = styled.div`
  margin-bottom: 2rem;

  img {
    width: 80px;
    height: auto;

    @media (max-width: 480px) {
      width: 60px;
    }
  }

  h1 {
    font-family: 'Carter One', cursive;
    font-size: 3rem;
    margin: 0.5rem 0;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }
`;

function App() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (inputs, validationError = null) => {
    // Handle validation errors from the form
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      console.log('Submitting with inputs:', inputs);
      const query = `${inputs.mood} movie ${inputs.era} similar to ${inputs.favoriteMovie}`;
      const results = await querySimilarContent(query);

      if (results && results.length > 0) {
        setRecommendations(results);
      } else {
        setError('No movie recommendations found. Try a different movie or preferences! 🔍');
      }
    } catch (error) {
      console.error('Error:', error);

      // Provide user-friendly error messages based on error type
      if (error.message.includes('API key')) {
        setError('There seems to be an issue with our movie database connection. Please try again in a moment! 🔑');
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        setError('Network connection issue. Please check your internet and try again! 🌐');
      } else if (error.message.includes('Supabase')) {
        setError('Our movie database is temporarily unavailable. Please try again shortly! 🗄️');
      } else {
        setError('Something unexpected happened. Please try again! 🤔');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleErrorDismiss = () => {
    setError(null);
  };

  return (
    <Container>
      <AppContent>
        <Logo>
          <img src="/images/popcorn.png" alt="PopChoice logo" />
          <h1>PopChoice</h1>
        </Logo>
        
        {!recommendations ? (
          <MovieForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            onErrorDismiss={handleErrorDismiss}
          />
        ) : (
          <Recommendation
            movies={recommendations}
            onReset={() => {
              setRecommendations(null);
              setError(null); // Clear errors when resetting
            }}
          />
        )}
      </AppContent>
    </Container>
  );
}

export default App;
