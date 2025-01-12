import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Question = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
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

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
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

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

function MovieForm({ onSubmit, loading }) {
  const [inputs, setInputs] = useState({
    favoriteMovie: '',
    era: '',
    mood: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(inputs).every(value => value.trim())) {
      onSubmit(inputs);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleChange = (field) => (e) => {
    setInputs(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
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
        <Input
          type="text"
          placeholder="Type 'new' or 'classic'"
          value={inputs.era}
          onChange={handleChange('era')}
        />
      </Question>

      <Question>
        <h2>Do you wanna have fun or do you want something serious?</h2>
        <Input
          type="text"
          placeholder="Type 'fun' or 'serious'"
          value={inputs.mood}
          onChange={handleChange('mood')}
        />
      </Question>

      <Button type="submit" disabled={loading}>
        {loading ? 'Finding your perfect movie...' : 'Let\'s Go'}
      </Button>
    </Form>
  );
}

export default MovieForm;
