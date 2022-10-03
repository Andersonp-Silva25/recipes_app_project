import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import mockDoneRecipes from '../services/mockDoneRecipes';

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
});

const URL = '/done-recipes';

describe('Testa a pagina Done Recipes', () => {
  test('Testa se a pagina tem os botões de filtro "All, Meals, Drinks"', () => {
    renderWithRouter(<App />, [URL]);

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');

    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
  });

  test('Testa o botão de compartilhar receita', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    navigator.clipboard = mockClipboard;
    renderWithRouter(<App />, [URL]);
    await waitFor(() => {
      const shareBtn = screen.queryAllByTestId('0-shareBtn');
      expect(shareBtn[0]).toBeInTheDocument();
      userEvent.click(shareBtn[0]);
      const linkCopied = screen.queryByText('Link copied!');
      expect(linkCopied).toBeInTheDocument();
      expect(navigator.clipboard.writeText).toBeCalled();
    });
  });

  test('Testa os botões de filtro', async () => {
    renderWithRouter(<App />, [URL]);

    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealsBtn);

    await waitFor(() => {
      const recipe = screen.getByText('Corba');
      expect(recipe).toBeInTheDocument();
    });

    const drinksBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinksBtn);

    await waitFor(() => {
      const recipe = screen.getByText('501 Blue');
      expect(recipe).toBeInTheDocument();
    });

    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allBtn);

    await waitFor(() => {
      const mealRecipe = screen.getByText('Corba');
      const drinkRecipe = screen.getByText('501 Blue');
      expect(mealRecipe).toBeInTheDocument();
      expect(drinkRecipe).toBeInTheDocument();
    });
  });
});
