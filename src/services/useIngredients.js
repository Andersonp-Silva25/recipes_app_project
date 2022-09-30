import { useEffect } from 'react';

function useIngredients(recipe, setIngredients, type, id) {
  useEffect(() => {
    function getIngredients() {
      const ingredients = [];
      for (let i = 1;
        recipe[0][`strIngredient${i}`] !== ''
        && recipe[0][`strIngredient${i}`] !== null;
        i += 1) {
        const Measure = recipe[0][`strMeasure${i}`] === null ? ''
          : recipe[0][`strMeasure${i}`];
        const obj = {
          Ingredient: recipe[0][`strIngredient${i}`],
          Measure,
          Completed: false,
          textDecoration: 'none',
        };
        ingredients.push(obj);
      }
      const savedInProgressRecipes = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
      if (savedInProgressRecipes) {
        const newIngredients = (savedInProgressRecipes[type][id])
          ? savedInProgressRecipes[type][id] : ingredients;
        setIngredients(newIngredients);
      } else setIngredients(ingredients);
    }
    if (recipe.length > 0) getIngredients();
  }, [recipe, setIngredients, id, type]);
}

export default useIngredients;
