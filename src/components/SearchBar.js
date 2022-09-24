import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const { filter, setFilter } = useContext(RecipesContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Pesquisou ${filter} :D`);
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="search-input"
          value={ filter }
          onChange={ ({ target }) => setFilter(target.value) }
        />
        <label htmlFor="ing">
          Ingredient
          <input
            type="radio"
            id="ing"
            name="ingredient"
            data-testid="ingredient-search-radio"
          // value={ typeFilter }
          // onChange={ ({ target }) => setTypeFilter(target.value) }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            name="name"
            value="name"
            id="name"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="search">
          First letter
          <input
            type="radio"
            name="search"
            value="search"
            id="search"
            data-testid="first-letter-search-radio"
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
