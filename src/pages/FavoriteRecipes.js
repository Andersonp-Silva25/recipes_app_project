import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const getFavoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [doneFavorites, setDoneFavorites] = useState(getFavoritesRecipes);
  const [selectedID, setSelectedID] = useState('');

  const copyURL = (url) => navigator.clipboard.writeText(url);

  const copy = (id, type) => {
    setSelectedID(id);
    copyURL(`${window.origin}/${type.toLowerCase()}s/${id}`);
  };

  const favoriteRecipe = (id) => {
    const favList = JSON.parse(localStorage.getItem('favoriteRecipes'))
      ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

    const deleteFav = favList.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFav));
    setDoneFavorites(deleteFav);
  };

  const handleBtn = ({ target: { value } }) => {
    let filter;
    switch (value) {
    case 'Meals':
      filter = getFavoritesRecipes.filter((recipe) => recipe.type === 'meal');
      setDoneFavorites(filter);
      break;
    case 'Drinks':
      filter = getFavoritesRecipes.filter((recipe) => recipe.type === 'drink');
      setDoneFavorites(filter);
      break;
    default:
      setDoneFavorites(getFavoritesRecipes);
      break;
    }
  };

  return (
    <div>
      <Header title="Favorites Recipes " />
      <br />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        value="All"
        onClick={ handleBtn }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        value="Meals"
        onClick={ handleBtn }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        value="Drinks"
        onClick={ handleBtn }
      >
        Drinks
      </button>
      <br />
      <br />

      {doneFavorites !== null && doneFavorites.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link to={ `${recipe.type.toLowerCase()}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <img
              src={ recipe.image }
              width="100px"
              alt={ `Imagem da receita ${recipe.name}` }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <button
            type="button"
            className="favorite-recipe"
            onClick={ () => favoriteRecipe(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeart }
              alt="Coração preenchido"
            />
          </button>
          <button
            data-testid={ `${index}-shareBtn` }
            type="button"
            onClick={ () => copy(recipe.id, recipe.type) }
          >
            <img
              src={ ShareIcon }
              alt="share-icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {(selectedID === recipe.id) && <span>Link copied!</span>}
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.catagory}</p>
          {recipe.type === 'meal'
            ? (
              <div>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
              </div>
            ) : (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </p>
            )}
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
