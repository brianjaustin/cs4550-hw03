import { render, screen } from '@testing-library/react';
import App from './App';

test('initially renders active game', () => {
  render(<App />);
  const headerElement = screen.getByText(/4digits/i);
  const paraElement = screen.getByText(/Guess a 4 digit number/i);
  
  expect(headerElement).toBeInTheDocument();
  expect(paraElement).toBeInTheDocument();
});
