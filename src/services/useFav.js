import { useEffect } from 'react';

function useFav(title, setIsFavorite, recipe) {
  useEffect(() => {
    function getFav() {
      const favList = JSON.parse(localStorage.getItem('favoriteRecipes'))
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

      if (recipe.length > 0) {
        const verifyFavorite = favList
          .some((fav) => fav.id === recipe[0][`id${title}`]);

        setIsFavorite(verifyFavorite);
      }
    }
    getFav();
  }, [title, setIsFavorite, recipe]);
}

export default useFav;
