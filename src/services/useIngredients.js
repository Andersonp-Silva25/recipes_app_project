import { useEffect } from 'react';

function useIngredients(recipe, setIngredients, title) {
  useEffect(() => {
    function getIngredients() {
      const Ingredients = [];
      if (title === 'Meal') {
        for (let i = 1; recipe[0][`strIngredient${i}`].length > 0; i += 1) {
          const obj = {
            Ingredient: recipe[0][`strIngredient${i}`],
            Measure: recipe[0][`strMeasure${i}`],
          };
          Ingredients.push(obj);
        }
      } else {
        for (let i = 1; recipe[0][`strIngredient${i}`] !== null; i += 1) {
          const Measure = recipe[0][`strMeasure${i}`] === null ? ''
            : recipe[0][`strMeasure${i}`];
          const obj = {
            Ingredient: recipe[0][`strIngredient${i}`],
            Measure,
          };
          Ingredients.push(obj);
        }
      }
      setIngredients(Ingredients);
    }
    if (recipe.length > 0) getIngredients();
  }, [recipe, setIngredients, title]);
}

export default useIngredients;
