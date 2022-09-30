import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente RecipeInProgress', () => {
  it('Testa se a pagina é renderizada', async () => {
    renderWithRouter(<App />, ['/drinks/14588/in-progress']);
    await waitFor(() => {
      const recipeTtile = screen.getByTestId('recipe-title');
      expect(recipeTtile).toBeInTheDocument();
    });
  });

  it('Testa se as checkbox são renderizadas', async () => {
    renderWithRouter(<App />, ['/meals/52977/in-progress']);
    await waitFor(() => {
      const checkbox = screen.getByTestId('0-ingredient-step');
      expect(checkbox).toBeInTheDocument();
      userEvent.click(checkbox);
      userEvent.click(checkbox);
    });
  });

  it('Testa o botão share', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    navigator.clipboard = mockClipboard;
    renderWithRouter(<App />, ['/meals/53065/in-progress']);
    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();
      userEvent.click(shareBtn);
    });
  });

  it('Testa o botão favoritar', async () => {
    renderWithRouter(<App />, ['/meals/52977/in-progress']);
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
