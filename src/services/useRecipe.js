import { useEffect } from 'react';

async function useRecipe(id, path, setRecipe) {
  let endpoint = '';
  if (path === 'Meal') endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (path === 'Drink') endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  useEffect(() => {
    async function getRecipe() {
      fetch(endpoint)
        .then((response) => response.json())
        .then(({ meals, drinks }) => {
          if (meals) {
            setRecipe(meals);
            localStorage.setItem('MealsAndDrinks', JSON.stringify(meals));
          }
          if (drinks) {
            setRecipe(drinks);
            localStorage.setItem('MealsAndDrinks', JSON.stringify(drinks));
          }
        })
        .catch((error) => console.error(`Something is wrong ${error}`));
    }
    getRecipe();
  }, [endpoint, setRecipe]);
}

export default useRecipe;
