import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import mockDoneRecipes from '../services/mockDoneRecipes';
// import filterBtn from '../pages/DoneRecipes';

beforeEach(() => {
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
  // const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // const [doneRecipes, setDoneRecipes] = useState(getDoneRecipes);
});

describe('Testa a pagina Done Recipes', () => {
  test('Testa se a pagina tem os botões de filtro "All, Meals, Drinks"', () => {
    renderWithRouter(<App />, ['/done-recipes']);

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
    renderWithRouter(<App />, ['/meals/52977']);
    await waitFor(() => {
      const shareBtn = screen.queryAllByTestId('share-btn');
      expect(shareBtn[0]).toBeInTheDocument();
      userEvent.click(shareBtn[0]);
    });
  });

  // test('Testa os botões de filtro', async () => {
  //   renderWithRouter(<App />, ['/done-recipes']);

  //   const mealsBtn = screen.getByTestId('filter-by-meal-btn');
  //   userEvent.click(mealsBtn);

  //   await waitFor(() => {
  //     expect(doneRecipes.length).toBe(1);
  //   });
  // });
});
