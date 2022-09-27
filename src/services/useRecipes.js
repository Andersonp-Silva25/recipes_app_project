import { useEffect } from 'react';

async function useRecipes(pathname, setMealsAndDrinksArrays) {
  let endpoint = '';
  if (pathname === '/meals') endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  if (pathname === '/drinks') endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    async function getRecipes() {
      fetch(endpoint)
        .then((response) => response.json())
        .then(({ meals, drinks }) => {
          if (meals) setMealsAndDrinksArrays(meals);
          if (drinks) setMealsAndDrinksArrays(drinks);
        })
        .catch((error) => console.error(`Something is wrong ${error}`));
    }
    getRecipes();
  }, [endpoint, setMealsAndDrinksArrays]);
}

export default useRecipes;
