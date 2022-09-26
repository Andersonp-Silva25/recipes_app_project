import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]); // array de obj da api
  const [name, setName] = useState(''); // dados do input filter
  // const [typeFilter, setTypeFilter] = useState(''); // tipo de pesquisa

  const contextValue = useMemo(() => ({
    recipes,
    setRecipes,
    name,
    setName,
  }), [recipes, name]);

  // https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

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
