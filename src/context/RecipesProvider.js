import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);

  const contextValue = {
    filter,
    recipes,
    setFilter,
    setRecipes,
    isDisplay,
    setIsDisplay,
  };

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
      .then((response) => response.json())
      .then(({ meals }) => {
        setRecipes(meals);
      })
      .catch((error) => console.error(`Something is wrong: ${error.message}`));
  }, []);

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
