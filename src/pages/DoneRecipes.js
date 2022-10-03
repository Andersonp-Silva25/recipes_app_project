import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const [doneRecipes, setDoneRecipes] = useState(getDoneRecipes);
  const [selectedID, setSelectedID] = useState('');

  const copyURL = (url) => navigator.clipboard.writeText(url);

  const copy = (id, type) => {
    setSelectedID(id);
    copyURL(`${window.origin}/${type.toLowerCase()}s/${id}`);
  };

  const handleBtn = ({ target: { value } }) => {
    let filter;
    switch (value) {
    case 'Meals':
      filter = getDoneRecipes.filter((recipe) => recipe.type === 'meal');
      setDoneRecipes(filter);
      break;
    case 'Drinks':
      filter = getDoneRecipes.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(filter);
      break;
    default:
      setDoneRecipes(getDoneRecipes);
      break;
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
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

      {doneRecipes !== null && doneRecipes.map((recipe, index) => (
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
          <p>
            {recipe.tags.map((tag, indexTag) => (
              <span
                key={ tag + indexTag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {`#${tag} `}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
