import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach(() => {
  localStorage.setItem('user', '{"email":"hakunaMatata@xablau.com"}');
});

describe('Testa o componente Recipes', () => {
  test('Testa se o email e os botões estão sendo renderizados corretamente', () => {
    renderWithRouter(<App />, ['/profile']);

    const email = screen.getByTestId('profile-email');
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

    expect(email).toBeInTheDocument();
    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão Done Recipes ele redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneRecipesBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Testa se ao clicar no botão Favorite Recipes ele redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteRecipesBtn);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se ao clicar no botão Logout ele redireciona para a tela de login', () => {
    const { history } = renderWithRouter(<App />, ['/profile']);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(history.location.pathname).toBe('/');
  });

  test('Testa se ao clicar no botão Logout as chaves do LocalStorages são limpas', () => {
    renderWithRouter(<App />, ['/profile']);

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutBtn);

    expect(localStorage.length).toBe(0);
  });
});
