import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Login from '../components/Login';
import renderWithRouter from './renderWithRouter';

// test('Farewell, front-end', () => {
//   // Este arquivo pode ser modificado ou deletado sem problemas
//   render(<App />);
//   const linkElement = screen.getByText(/TRYBE/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Todos os testes', () => {
  test('Verifica se a tela Login renderiza corretamente', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { level: 1, name: 'Recipe App' });
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(email, 'xablau@xablau.com');
    userEvent.type(password, '12345678');

    expect(button).not.toBeDisabled();

    userEvent.click(button);
  });
});
