import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useRecipe from '../services/useRecipe';
import useRecipes from '../services/useRecipes';
import useIngredients from '../services/useIngredients';
import RecipesContext from '../context/RecipesContext';

function RecipeDetails({ match: { params: { id }, path } }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const { setMealsAndDrinksArrays } = useContext(RecipesContext);
  let title = '';
  let recommendationTitle = '';
  if (path.includes('/meals')) {
    title = 'Meal';
    recommendationTitle = '/drinks';
  }
  if (path.includes('/drinks')) {
    title = 'Drink';
    recommendationTitle = '/meals';
  }

  useRecipe(id, title, setRecipe);
  useRecipes(recommendationTitle, setMealsAndDrinksArrays);
  useIngredients(recipe, setIngredients, title);

  return (
    <div>
      {recipe.length > 0
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
