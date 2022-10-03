import React from 'react';

function FavoriteDoneRecipesBTN(props) {
  const handleBtn = props;
  console.log(handleBtn);
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="All"
        onClick={ () => handleBtn() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="Meals"
        onClick={ () => handleBtn() }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="Drinks"
        onClick={ () => handleBtn() }
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteDoneRecipesBTN;
