import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useRecipe from '../services/useRecipe';
import useRecipes from '../services/useRecipes';
import useIngredients from '../services/useIngredients';
import useFav from '../services/useFav';
import RecipesContext from '../context/RecipesContext';
import './RecipeDetails.css';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareRecipe from '../services/shareRecipe';

function RecipeDetails({ match: { params: { id }, path } }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [didCopy, setDidCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    mealsAndDrinksArrays,
    setMealsAndDrinksArrays,
  } = useContext(RecipesContext);

  let title = '';
  let type = '';
  let recommendationTitle = '';
  let invertedTitle = '';
  const cardLimit = 6;

  if (path.includes('/meals')) {
    title = 'Meal';
    type = 'meals';
    recommendationTitle = '/drinks';
    invertedTitle = 'Drink';
  }
  if (path.includes('/drinks')) {
    title = 'Drink';
    type = 'drinks';
    recommendationTitle = '/meals';
    invertedTitle = 'Meal';
  }

  useRecipe(id, title, setRecipe);
  useRecipes(recommendationTitle, setMealsAndDrinksArrays);
  useIngredients(recipe, setIngredients, type, id);
  useFav(title, setIsFavorite, recipe);

  const getDoneRecipes = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
    const isDone = doneRecipes.some((doneRecipe) => doneRecipe.id === id);
    return isDone;
  };

  const getInProgressRecipes = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
  ?? { drinks: {}, meals: {} };
    const isInProgress = Object.keys(inProgressRecipes[type])
      .some((progress) => progress === id);
    return isInProgress;
  };

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
      {(recipe.length > 0)
        && (
          <div>
            <h1 data-testid="recipe-title">{recipe[0][`str${title}`]}</h1>
            { title === 'Meal'
            && <h4 data-testid="recipe-category">{recipe[0].strCategory}</h4>}
            { title === 'Drink'
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

            {ingredients.map(({ Ingredient, Measure }, index) => (
              <div
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${Ingredient} - ${Measure}`}
              </div>
            ))}
            <p data-testid="instructions">{ recipe[0].strInstructions }</p>
            { title === 'Meal' && (
              <iframe
                data-testid="video"
                title={ `Intruções do ${recipe[0][`str${title}`]}` }
                width="420"
                height="315"
                src={ recipe[0].strYoutube }
              />
            )}
            <div className="recomedation-container">
              {mealsAndDrinksArrays
              && mealsAndDrinksArrays.slice(0, cardLimit)
                .map((item, index) => (
                  <div
                    key={ item[`id${invertedTitle}`] }
                    data-testid={ `${index}-recommendation-card` }
                  >
                    <p data-testid={ `${index}-recommendation-title` }>
                      {item[`str${invertedTitle}`]}
                    </p>
                    <img
                      src={ item[`str${invertedTitle}Thumb`] }
                      alt={ `Imagem do ${item.strMeal}` }
                      width="100px"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      {!getDoneRecipes() && (
        <Link to={ `${path.split(':')[0]}${id}/in-progress` }>
          <button
            type="button"
            className="start-recipe"
            data-testid="start-recipe-btn"
          >
            {getInProgressRecipes() ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </Link>
      )}

    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipeDetails;
