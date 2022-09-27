// https://www.thecocktaildb.com/api/json/v1/1/

async function fetchDrinks(searchSelected, name, history) {
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
  const drinksReq = await fetch(api)
    .then((response) => response.json())
    .then(({ drinks }) => {
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
      }
      return drinks;
    })
    .catch((error) => {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      console.error(`Something is wrong ${error}`);
    });
  return drinksReq;
}

export default fetchDrinks;
