import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import useRecipes from '../services/useRecipes';

function Recipes({ title }) {
  const { mealsAndDrinksArrays, setMealsAndDrinksArrays } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const cardLimit = 12;

  useRecipes(pathname, setMealsAndDrinksArrays);

  return (
    <div>
      {mealsAndDrinksArrays
      && mealsAndDrinksArrays.slice(0, cardLimit)
        .map((item, index) => (
          <div key={ item[`id${title}`] } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>
              {item[`str${title}`]}
            </p>
            <img
              src={ item[`str${title}Thumb`] }
              data-testid={ `${index}-card-img` }
              alt={ `Imagem do ${item.strMeal}` }
              width="50px"
            />
          </div>
        ))}
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recipes;
