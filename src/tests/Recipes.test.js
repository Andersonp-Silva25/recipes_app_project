import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Recipes', () => {
  test('testa se o caminho é "/meals"', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />, ['/meals']);
    expect(pathname).toBe('/meals');
  });

  test('Testa se as receitas são renderizadas', async () => {
    renderWithRouter(<App />, ['/meals']);
    await waitFor(() => {
      const firstRecipeCard = screen.getByTestId('0-recipe-card');
      expect(firstRecipeCard).toBeInTheDocument();
    });
  });

  test('Testa se é feita a requisição ao clicar no botão "All" em "/meals"', () => {
    renderWithRouter(<App />, ['/meals']);
    const button = screen.getByTestId('All-category-filter');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
  });

  test('Testa se é feita a requisição ao clicar no botão "All" em "/drinks"', () => {
    renderWithRouter(<App />, ['/drinks']);
    const button = screen.getByTestId('All-category-filter');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
  });

  test('Testa se as categorias são renderizadas', async () => {
    renderWithRouter(<App />, ['/meals']);
    await waitFor(() => {
      const firstCategoryFilter = screen.getByTestId('Goat-category-filter');
      expect(firstCategoryFilter).toBeInTheDocument();
    });
  });

  test('Testa se o filtro Beef', async () => {
    renderWithRouter(<App />, ['/meals']);
    await waitFor(() => {
      const firstCategoryFilter = screen.getByTestId('Beef-category-filter');
      userEvent.click(firstCategoryFilter);
    });
    await waitFor(() => {
      const firstBeefCard = screen.getByTestId('0-card-name');
      expect(firstBeefCard.innerHTML).toBe('Beef and Mustard Pie');
    });
    const firstCategoryFilter = screen.getByTestId('Beef-category-filter');
    userEvent.click(firstCategoryFilter);
    await waitFor(() => {
      const firstCard = screen.getByTestId('0-card-name');
      expect(firstCard.innerHTML).toBe('Corba');
    });
  });
});
