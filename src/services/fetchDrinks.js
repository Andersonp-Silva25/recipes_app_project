// https://www.thecocktaildb.com/api/json/v1/1/

async function fetchDrinks(searchSelected, name, setMealsArrays, history) {
  let api = '';

  if (searchSelected === 'ingredient') {
    api = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`;
  }
  if (searchSelected === 'name') {
    api = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  }
  if (searchSelected === 'firstLetter') {
    if (name.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      api = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${name}`;
    }
  }
  fetch(api)
    .then((response) => response.json())
    .then(({ drinks }) => {
      console.log(drinks);
      setMealsArrays(drinks);
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
      }
    })
    .catch((error) => console.error(`Something is wrong ${error}`));
}

export default fetchDrinks;
