import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [name, setName] = useState(''); // dados do input filter
  const [mealsAndDrinksArrays, setMealsAndDrinksArrays] = useState([]);
  // const [typeFilter, setTypeFilter] = useState(''); // tipo de pesquisa

  const contextValue = useMemo(() => ({
    name,
    setName,
    mealsAndDrinksArrays,
    setMealsAndDrinksArrays,
  }), [name, mealsAndDrinksArrays]);

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
