import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useRecipe from '../services/useRecipe';
import useRecipes from '../services/useRecipes';
import useIngredients from '../services/useIngredients';
import RecipesContext from '../context/RecipesContext';
import './RecipeDetails.css';

function RecipeDetails({ match: { params: { id }, path } }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { mealsAndDrinksArrays, setMealsAndDrinksArrays } = useContext(RecipesContext);
  let title = '';
  let recommendationTitle = '';
  let invertedTitle = '';
  const cardLimit = 6;

  if (path.includes('/meals')) {
    title = 'Meal';
    recommendationTitle = '/drinks';
    invertedTitle = 'Drink';
  }
  if (path.includes('/drinks')) {
    title = 'Drink';
    recommendationTitle = '/meals';
    invertedTitle = 'Meal';
  }

  useRecipe(id, title, setRecipe);
  useRecipes(recommendationTitle, setMealsAndDrinksArrays);
  useIngredients(recipe, setIngredients, title);

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
