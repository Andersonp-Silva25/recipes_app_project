import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import fetchMeels from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';

function SearchBar() {
  const { name, setName, setMealsArrays } = useContext(RecipesContext);
  const [searchSelected, setSearchSelected] = useState('');
  const history = useHistory();
  const { location: { pathname } } = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pathname === '/meals') {
      await fetchMeels(searchSelected, name, setMealsArrays, history);
      // history.push(`/meals/${mealsArray[0].idMeal}`);
    }
    if (pathname === '/drinks') {
      await fetchDrinks(searchSelected, name, setMealsArrays, history);
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
        <button type="submit" data-testid="exec-search-btn">
          Search
        </button>
      </form>
    </div>
  );
}
export default SearchBar;
