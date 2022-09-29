import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useRecipe from '../services/useRecipe';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
// import blackHeart from '../images/blackHeartIcon.svg';
import shareRecipe from '../services/shareRecipe';

function RecipeInProgress({ match: { params: { id }, path } }) {
  const [recipe, setRecipe] = useState([]);
  let title = '';

  if (path.includes('/meals')) {
    title = 'Meal';
  }
  if (path.includes('/drinks')) {
    title = 'Drink';
  }

  useRecipe(id, title, setRecipe);

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
