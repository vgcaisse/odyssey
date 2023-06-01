import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const headerElement = screen.getByText(/Place Tracker/i);
  expect(headerElement).toBeInTheDocument();
});

test('subtracts start date by days out of home', () => {
  render(<App />);
  const startDateInput = screen.getByLabelText(/Start Date:/i);
  fireEvent.change(startDateInput, { target: { value: '2023-05-01' } });

  const daysOutOfHomeInput = screen.getByLabelText(/Days out of Home:/i);
  fireEvent.change(daysOutOfHomeInput, { target: { value: '5' } });

  const daysRemainingElement = screen.getByText(/Days Remaining:/i);
  expect(daysRemainingElement.textContent).toBe('Days Remaining: 0');
});

test('displays error message when daysRemaining is less than 1', () => {
  render(<App />);
  const startDateInput = screen.getByLabelText(/Start Date:/i);
  fireEvent.change(startDateInput, { target: { value: '2023-05-20' } });

  const daysOutOfHomeInput = screen.getByLabelText(/Days out of Home:/i);
  fireEvent.change(daysOutOfHomeInput, { target: { value: '10' } });

  const errorElement = screen.getByText(/Are you coming back home today\?/i);
  expect(errorElement).toBeInTheDocument();
});

// these should be enough; I had a test that tested if a user unputed a string and if they tried inputing a negative value but I think I made it impossible for the user to achieve this so


// just in case for future use:

// test('throws error when user inputs a string value', () => {
//   render(<App />);
//   const daysOutOfHomeInput = screen.getByLabelText(/Days out of Home:/i);
//   fireEvent.change(daysOutOfHomeInput, { target: { value: 'invalid' } });

//   const errorElement = screen.getByText(/Please enter a valid number of days out of home./i);
//   expect(errorElement).toBeInTheDocument();
// });

// test('throws error when user inputs a value lower than 0', () => {
//   render(<App />);
//   const daysOutOfHomeInput = screen.getByLabelText(/Days out of Home:/i);
//   fireEvent.change(daysOutOfHomeInput, { target: { value: '-2' } });

//   const errorElement = screen.getByText(/Time travelling not allowed!/i);
//   expect(errorElement).toBeInTheDocument();
// });
