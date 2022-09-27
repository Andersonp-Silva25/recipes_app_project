import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import renderWithRouter from './renderWithRouter';

describe('Todos os testes', () => {
  test('Verifica se a tela Login renderiza corretamente', () => {
    renderWithRouter(<Login />);
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
  // aqui dá problema por conta do filter (tem q saber fazer teste com useContext eu acho...)
  test('Verifica se a tela Profile renderiza corretamente', () => {
    renderWithRouter(<Profile />);
    const title = screen.getByRole('heading', { level: 1, name: 'Profile' });
    const button = screen.getByRole('button');
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
