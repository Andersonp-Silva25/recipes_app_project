import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import useRecipes from '../services/useRecipes';
import useCategories from '../services/useCategories';
import filterCategories from '../services/useFilterCategories';

function Recipes({ title }) {
  const { mealsAndDrinksArrays, setMealsAndDrinksArrays,
    categories } = useContext(RecipesContext);
  const { location: { pathname } } = useHistory();
  const [currentFilter, setCurrentFilter] = useState('');
  const categoryLimit = 5;
  const cardLimit = 12;

  useRecipes(pathname, setMealsAndDrinksArrays);
  useCategories(pathname);

  const clearFilter = () => {
    let endpoint = '';
    if (pathname === '/meals') endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    if (pathname === '/drinks') endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    fetch(endpoint)
      .then((response) => response.json())
      .then(({ meals, drinks }) => {
        if (meals) setMealsAndDrinksArrays(meals);
        if (drinks) setMealsAndDrinksArrays(drinks);
      })
      .catch((error) => console.error(`Something is wrong ${error}`));
  };

  return (
    <div>
      {categories
      && categories.slice(0, categoryLimit)
        .map(({ strCategory }, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            onClick={ () => {
              if (strCategory !== currentFilter) {
                filterCategories(pathname, strCategory, setMealsAndDrinksArrays);
                setCurrentFilter(strCategory);
              } else {
                clearFilter();
                setCurrentFilter('');
              }
            } }
          >
            {strCategory}
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ clearFilter }
      >
        All

      </button>
      {mealsAndDrinksArrays
      && mealsAndDrinksArrays.slice(0, cardLimit)
        .map((item, index) => (
          <Link key={ item[`id${title}`] } to={ `${pathname}/${item[`id${title}`]}` }>
            <div
              data-testid={ `${index}-recipe-card` }
            >
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
          </Link>
        ))}
    </div>
  );
}

Recipes.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Recipes;
