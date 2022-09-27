import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente SearchBar', () => {
  it('Testa se é exibido o alerta caso tenha mais de uma letra com a opção primeira letra', () => {
    renderWithRouter(<App />, ['/meals']);
    global.alert = jest.fn();
    const showSearchBar = screen.getAllByRole('button')[1];
    userEvent.click(showSearchBar);
    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'uepa');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character');
  });

  it('Testa se os botões de radio estão funcionando', () => {
    renderWithRouter(<App />, ['/drinks']);
    const showSearchBar = screen.getAllByRole('button')[1];
    userEvent.click(showSearchBar);
    const ingredientRadio = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeInTheDocument();
    const nameRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameRadio);
    expect(nameRadio).toBeInTheDocument();
  });

  it('Testa se é feito a requisição na pagina drinks', async () => {
    renderWithRouter(<App />, ['/drinks']);
    const showSearchBar = screen.getAllByRole('button')[1];
    userEvent.click(showSearchBar);
    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'a');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);
    await waitFor(() => {
      const firstRecipeCard = screen.getByTestId('0-recipe-card');
      expect(firstRecipeCard).toBeInTheDocument();
    });
  });
});
