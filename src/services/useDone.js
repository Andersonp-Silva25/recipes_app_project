import { useEffect } from 'react';

function useDone(title, setIsDone, recipe) {
  useEffect(() => {
    function getDone() {
      const doneList = JSON.parse(localStorage.getItem('doneRecipes'))
        ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

      if (recipe.length > 0) {
        const verifyDone = doneList
          .some((done) => done.id === recipe[0][`id${title}`]);

        setIsDone(verifyDone);
      }
    }
    getDone();
  }, [title, setIsDone, recipe]);
}

export default useDone;
