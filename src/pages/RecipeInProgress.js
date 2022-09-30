import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useRecipe from '../services/useRecipe';
import useIngredients from '../services/useIngredients';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// import blackHeart from '../images/blackHeartIcon.svg';
import shareRecipe from '../services/shareRecipe';

function RecipeInProgress({ match: { params: { id }, path } }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  let title = '';
  let type = '';

  if (path.includes('/meals')) {
    title = 'Meal';
    type = 'meals';
  }
  if (path.includes('/drinks')) {
    title = 'Drink';
    type = 'drinks';
  }

  function addIngredient() {
    const savedInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : {};
    const newInProgressRecipes = {
      ...savedInProgressRecipes,
      [type]: {
        ...savedInProgressRecipes[type],
        [id]: ingredients,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
  }

  async function ingredientHandle(index) {
    await addIngredient();

    ingredients[index].Completed = !(ingredients[index].Completed);
    const ingredientName = document.getElementById(`${index}-ingredient-step`)
      .parentElement;
    const checkbox = document.getElementById(`${index}-ingredient-step`);
    if (ingredients[index].Completed) {
      ingredientName.style.textDecoration = 'line-through';
      ingredients[index].textDecoration = 'line-through';
      checkbox.checked = true;
    } else {
      ingredientName.style.textDecoration = 'none';
      ingredients[index].textDecoration = 'none';
      checkbox.checked = false;
    }

    addIngredient();
  }

  useRecipe(id, title, setRecipe);
  useIngredients(recipe, setIngredients, type, id);

  return (
    <div>
      {recipe.length > 0
        && (
          <div>
            <h1 data-testid="recipe-title">{recipe[0][`str${title}`]}</h1>
            {title === 'Meal'
              && <h4 data-testid="recipe-category">{recipe[0].strCategory}</h4>}
            {title === 'Drink'
              && (
                <h4 data-testid="recipe-category">
                  {`${recipe[0].strCategory} ${recipe[0].strAlcoholic}`}
                </h4>)}
            <img
              data-testid="recipe-photo"
              src={ recipe[0][`str${title}Thumb`] }
              alt={ `Imagem do ${recipe[0][`str${title}`]}` }
              width="200px"
            />
            <button
              type="button"
              className="favorite-recipe"
            // onClick={ favoriteRecipe }
            >
              <img
                data-testid="favorite-btn"
                src={ whiteHeart }
                alt="Coração vazio"
              />
            </button>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => shareRecipe(setDidCopy) }
            >
              <img src={ ShareIcon } alt="share-icon" />
            </button>
            {ingredients.length > 0
              && (
                <div>
                  {ingredients
                    .map(({ Ingredient, Measure, Completed, textDecoration }, index) => (
                      <label
                        key={ index }
                        data-testid={ `${index}-ingredient-step` }
                        htmlFor={ `${index}-ingredient-step` }
                        style={ { textDecoration } }
                      >
                        {`${Ingredient} - ${Measure}`}
                        <input
                          id={ `${index}-ingredient-step` }
                          type="checkbox"
                          checked={ Completed }
                          onChange={ () => ingredientHandle(index) }
                        />
                      </label>
                    ))}
                </div>
              )}
            <p data-testid="instructions">{recipe[0].strInstructions}</p>
            <button
              data-testid="finish-recipe-btn"
              type="button"
            >
              Finalizar
            </button>
          </div>
        )}
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
