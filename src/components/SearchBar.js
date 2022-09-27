import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import fetchMeels from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';

function SearchBar(props) {
  const { name, setName, mealsArray, setMealsArrays } = useContext(RecipesContext);
  const [searchSelected, setSearchSelected] = useState('');
  const history = useHistory();
  const { location: { pathname } } = useHistory();
  const cardLimit = 12;
  let { title } = props;

  if (title === 'Meals') title = 'Meal';
  if (title === 'Drinks') title = 'Drink';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pathname === '/meals') {
      const mealsReq = await fetchMeels(searchSelected, name, history);
      setMealsArrays(mealsReq);
    }
    if (pathname === '/drinks') {
      const drinksReq = await fetchDrinks(searchSelected, name, history);
      setMealsArrays(drinksReq);
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="search-input"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />

        <div>
          <label htmlFor="ing">
            Ingredient
            <input
              type="radio"
              id="ing"
              name="search"
              data-testid="ingredient-search-radio"
              value="ingredient"
              onClick={ ({ target }) => setSearchSelected(target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="name">
            Name
            <input
              type="radio"
              name="search"
              id="name"
              data-testid="name-search-radio"
              value="name"
              onClick={ ({ target }) => setSearchSelected(target.value) }
            />
          </label>
        </div>
        <div>
          <label htmlFor="search">
            First letter
            <input
              type="radio"
              name="search"
              id="search"
              data-testid="first-letter-search-radio"
              value="firstLetter"
              onClick={ ({ target }) => setSearchSelected(target.value) }
            />
          </label>
        </div>
        <button type="button" data-testid="exec-search-btn" onClick={ handleSubmit }>
          Search
        </button>
      </form>
      {mealsArray
        && mealsArray.slice(0, cardLimit)
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

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
