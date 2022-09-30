import { useEffect } from 'react';

function useCompleted(ingredients, setCompleted) {
  useEffect(() => {
    function didFinish() {
      let completed = true;
      ingredients.forEach((ingredient) => {
        if (!ingredient.Completed) completed = false;
      });
      setCompleted(completed);
    }
    didFinish();
  }, [ingredients, setCompleted]);
}

export default useCompleted;
