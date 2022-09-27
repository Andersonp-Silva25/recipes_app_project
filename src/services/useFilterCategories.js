async function useFilterCategories(pathname, categorie, setMealsAndDrinksArrays) {
  let endpoint = '';
  if (pathname === '/meals') endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`;
  if (pathname === '/drinks') endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`;
  async function getCategories() {
    fetch(endpoint)
      .then((response) => response.json())
      .then(({ meals, drinks }) => {
        if (meals) setMealsAndDrinksArrays(meals);
        if (drinks) setMealsAndDrinksArrays(drinks);
      })
      .catch((error) => console.error(`Something is wrong ${error}`));
  }
  getCategories();
}

export default useFilterCategories;
