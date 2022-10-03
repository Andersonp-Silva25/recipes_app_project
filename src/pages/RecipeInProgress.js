import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useRecipe from '../services/useRecipe';
import useFav from '../services/useFav';
import useIngredients from '../services/useIngredients';
import useCompleted from '../services/useCompleted';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareRecipe from '../services/shareRecipe';

function RecipeInProgress({ match: { params: { id }, path } }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [didCopy, setDidCopy] = useState(false);
  const [completed, setCompleted] = useState(false);
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
      ? JSON.parse(localStorage.getItem('inProgressRecipes')) : { drinks: {}, meals: {} };
    const newInProgressRecipes = {
      ...savedInProgressRecipes,
      [type]: {
        ...savedInProgressRecipes[type],
        [id]: ingredients,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newInProgressRecipes));
  }

  function ingredientHandle(index) {
    const newIngredients = [];

    ingredients.forEach((ingredient, index2) => {
      if (index === index2) {
        ingredient.Completed = !(ingredient.Completed);
        if (ingredient.Completed) {
          ingredient.textDecoration = 'line-through';
        } else {
          ingredient.textDecoration = 'none';
        }
      }
      newIngredients.push(ingredient);
    });

    setIngredients(newIngredients);

    addIngredient();
  }

  useRecipe(id, title, setRecipe);
  useIngredients(recipe, setIngredients, type, id);
  useFav(title, setIsFavorite, recipe);
  useCompleted(ingredients, setCompleted);

  const favoriteRecipe = () => {
    const favList = JSON.parse(localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    const alcoholicOrNot = recipe[0].strAlcoholic ? recipe[0].strAlcoholic : '';
    const nationality = recipe[0].strArea ? recipe[0].strArea : '';

    if (!isFavorite) {
      const obj = {
        id: recipe[0][`id${title}`],
        type: title.toLowerCase(),
        nationality,
        category: recipe[0].strCategory,
        alcoholicOrNot,
        name: recipe[0][`str${title}`],
        image: recipe[0][`str${title}Thumb`],
      };
      const newArray = [...favList, obj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      setIsFavorite(true);
    } else {
      const deleteFav = favList.filter((fav) => fav.id !== recipe[0][`id${title}`]);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFav));
      setIsFavorite(false);
    }
  };

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
              onClick={ favoriteRecipe }
            >
              {isFavorite ? (
                <img
                  data-testid="favorite-btn"
                  src={ blackHeart }
                  alt="Coração preenchido"
                />
              ) : (
                <img
                  data-testid="favorite-btn"
                  src={ whiteHeart }
                  alt="Coração vazio"
                />
              )}
            </button>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => shareRecipe(setDidCopy) }
            >
              <img src={ ShareIcon } alt="share-icon" />
            </button>

            {didCopy && <p>Link copied!</p>}

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
            <Link to="/done-recipes">
              <button
                data-testid="finish-recipe-btn"
                type="button"
                disabled={ !completed }
                style={ { position: 'fixed', bottom: 0 } }
              >
                Finalizar
              </button>
            </Link>
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
