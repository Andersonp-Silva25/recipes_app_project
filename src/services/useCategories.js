import { useEffect, useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

async function useCategories(pathname) {
  const { setCategories } = useContext(RecipesContext);
  let endpoint = '';
  if (pathname === '/meals') endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  if (pathname === '/drinks') endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    async function getCategories() {
      fetch(endpoint)
        .then((response) => response.json())
        .then(({ meals, drinks }) => {
          if (meals) setCategories(meals);
          if (drinks) setCategories(drinks);
        })
        .catch((error) => console.error(`Something is wrong ${error}`));
    }
    getCategories();
  }, [endpoint, setCategories]);
}

export default useCategories;
