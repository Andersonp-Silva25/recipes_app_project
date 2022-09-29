import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente RecipeDetails', () => {
  it('Testa se a comida é renderizada', async () => {
    renderWithRouter(<App />, ['/meals/52977']);
    await waitFor(() => {
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle).toBeInTheDocument();
      expect(recipeTitle.innerHTML).toBe('Corba');
    });
  });

  it('Testa se a bebida é renderizada', async () => {
    renderWithRouter(<App />, ['/drinks/17222']);
    await waitFor(() => {
      const recipeTitle = screen.getByTestId('recipe-title');
      expect(recipeTitle).toBeInTheDocument();
      expect(recipeTitle.innerHTML).toBe('A1');
    });
  });

  it('Testa o botão share', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    navigator.clipboard = mockClipboard;
    renderWithRouter(<App />, ['/meals/52977']);
    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();
      userEvent.click(shareBtn);
    });
  });

  it('Testa o botão favoritar', async () => {
    renderWithRouter(<App />, ['/drinks/17222']);
    const favBtnId = 'favorite-btn';
    await waitFor(() => {
      const favButton = screen.getByTestId(favBtnId);
      expect(favButton).toBeInTheDocument();
      userEvent.click(favButton);
    });
    await waitFor(() => {
      const favButton = screen.getByTestId(favBtnId);
      expect(favButton).toHaveAttribute('src', 'blackHeartIcon.svg');
      userEvent.click(favButton);
    });
    await waitFor(() => {
      const favButton = screen.getByTestId(favBtnId);
      expect(favButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    });
  });
});
