import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componante Header', () => {
  it('Testa se a barra é exibida/oculta quando o botão de pesquisa é clicado', () => {
    renderWithRouter(<App />, ['/meals']);
    const searchButton = screen.getAllByRole('button')[1];
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.click(searchButton);
    expect(searchInput).not.toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de perfil, a pagina é de perfil é mostrada', () => {
    const { history } = renderWithRouter(<App />, ['/meals']);
    const perfilButton = screen.getAllByRole('button')[0];
    userEvent.click(perfilButton);
    expect(history.location.pathname).toBe('/profile');
  });
});
