import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 1.5rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const Question = styled.div`
  margin-bottom: 1rem;
  width: 100%;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
    line-height: 1.3;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }

    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 0.8rem;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid #4ade80;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const ChoiceButton = styled.button`
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  background: ${props => props.selected ? '#4ade80' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.selected ? '#0a0d24' : '#ffffff'};
  border: 2px solid ${props => props.selected ? '#4ade80' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Roboto Slab', serif;
  font-weight: ${props => props.selected ? 'bold' : 'normal'};
  min-height: 48px; /* Touch-friendly minimum height */
  -webkit-tap-highlight-color: transparent;

  &:hover, &:active {
    background: ${props => props.selected ? '#22c55e' : 'rgba(255, 255, 255, 0.15)'};
    border-color: ${props => props.selected ? '#22c55e' : 'rgba(255, 255, 255, 0.4)'};
    transform: translateY(-1px);
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
    font-size: 1.1rem;
    min-height: 52px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #4ade80;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
`;

const LoadingMessages = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-style: italic;
`;

const ErrorContainer = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ErrorTitle = styled.h3`
  color: #ef4444;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const ErrorButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: #dc2626;
  }
`;

const LoadingComponent = ({ loading }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    "🤖 Analyzing your movie taste...",
    "🎬 Searching through our movie database...",
    "🧠 AI is thinking about perfect matches...",
    "🎯 Finding movies you'll absolutely love...",
    "✨ Almost there! Preparing your recommendations..."
  ];

  React.useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Finding your perfect movie...</LoadingText>
      <LoadingMessages>{loadingMessages[messageIndex]}</LoadingMessages>
    </LoadingContainer>
  );
};

const ErrorComponent = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <ErrorContainer>
      <ErrorTitle>
        ⚠️ Oops! Something went wrong
      </ErrorTitle>
      <ErrorMessage>{error}</ErrorMessage>
      <ErrorButton onClick={onDismiss}>Try Again</ErrorButton>
    </ErrorContainer>
  );
};

function MovieForm({ onSubmit, loading, error, onErrorDismiss }) {
  const [inputs, setInputs] = useState({
    favoriteMovie: '',
    era: '',
    mood: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear any existing errors first
    onErrorDismiss && onErrorDismiss();

    // Validate each field and provide specific error messages
    if (!inputs.favoriteMovie.trim()) {
      // We need to call the parent's error handler, but MovieForm doesn't have access to setError
      // Let's pass the validation back to the parent
      onSubmit(inputs, 'Please enter your favorite movie! 🎬');
      return;
    }

    if (!inputs.era) {
      onSubmit(inputs, 'Please choose between new releases or classics! 🎭');
      return;
    }

    if (!inputs.mood) {
      onSubmit(inputs, 'Please tell us if you want something fun or serious! 🎯');
      return;
    }

    // All validation passed, submit normally
    onSubmit(inputs);
  };

  const handleChange = (field) => (e) => {
    setInputs(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  if (loading) {
    return <LoadingComponent loading={loading} />;
  }

  return (
    <div>
      <ErrorComponent error={error} onDismiss={onErrorDismiss} />

      <Form onSubmit={handleSubmit}>
        <Question>
          <h2>What's your favorite movie and why?</h2>
          <Input
            type="text"
            placeholder="e.g., The Shawshank Redemption"
            value={inputs.favoriteMovie}
            onChange={handleChange('favoriteMovie')}
          />
        </Question>

        <Question>
          <h2>Are you in the mood for something new or a classic?</h2>
          <ButtonGroup>
            <ChoiceButton
              type="button"
              selected={inputs.era === 'new'}
              onClick={() => setInputs(prev => ({ ...prev, era: 'new' }))}
            >
              🆕 New Releases
            </ChoiceButton>
            <ChoiceButton
              type="button"
              selected={inputs.era === 'classic'}
              onClick={() => setInputs(prev => ({ ...prev, era: 'classic' }))}
            >
              🎭 Classics
            </ChoiceButton>
          </ButtonGroup>
        </Question>

        <Question>
          <h2>Do you wanna have fun or do you want something serious?</h2>
          <ButtonGroup>
            <ChoiceButton
              type="button"
              selected={inputs.mood === 'fun'}
              onClick={() => setInputs(prev => ({ ...prev, mood: 'fun' }))}
            >
              🎉 Fun & Light
            </ChoiceButton>
            <ChoiceButton
              type="button"
              selected={inputs.mood === 'serious'}
              onClick={() => setInputs(prev => ({ ...prev, mood: 'serious' }))}
            >
              🎭 Serious & Deep
            </ChoiceButton>
          </ButtonGroup>
        </Question>

        <SubmitButton type="submit" disabled={loading}>
          Let's Go 🚀
        </SubmitButton>
      </Form>
    </div>
  );
}

export default MovieForm;
