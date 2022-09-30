import React from 'react';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  // /// ///////////////////////// mock
  // const receitaTeste = [{
  //   id: 52977,
  //   type: 'meal',
  //   nationality: 'brasileira',
  //   category: 'Side',
  //   alcoholicOrNot: '',
  //   name: 'Corba',
  //   image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  //   doneDate: '27/08/2022',
  //   tags: ['Lentils', 'Onion'],
  // },
  // {
  //   id: 15997,
  //   type: 'drink',
  //   nationality: 'brasileira',
  //   category: 'beef',
  //   alcoholicOrNot: '',
  //   name: 'Beef and Mustard Pie',
  //   image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
  //   doneDate: '30/09/2022',
  //   tags: ['Beef', 'Plain Flour'],
  // }];

  // localStorage.setItem('doneRecipes', JSON.stringify(receitaTeste));
  // /// //////////////////////////////

  const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <div>
      <Header title="Done Recipes" />
      Done Recipes
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      {getDoneRecipes.map((recipe, index) => (
        <div key={ recipe.id }>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <img
            src={ recipe.image }
            width="100px"
            alt={ `Imagem da receita ${recipe.name}` }
            data-testid={ `${index}-horizontal-image` }
          />
          <img
            src={ ShareIcon }
            alt="share-icon"
            data-testid={ `${index}-horizontal-share-btn` }
          />
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
