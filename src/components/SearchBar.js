import React, { useContext, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { name, setName } = useContext(RecipesContext);
  const [searchSelected, setSearchSelected] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let endpoint = '';
    if (searchSelected === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
    }
    if (searchSelected === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    }
    if (searchSelected === 'firstLetter') {
      if (name.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
      }
    }
    fetch(endpoint)
      .then((response) => response.json())
      .then(({ meals }) => {
        console.log(meals);
      })
      .catch((error) => console.error(`Something is wrong ${error}`));
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
        <button
          type="submit"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
