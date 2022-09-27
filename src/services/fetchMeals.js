// https://www.themealdb.com/api/json/v1/1/

async function fetchMeels(searchSelected, name, history) {
  let api = '';

  if (searchSelected === 'ingredient') {
    api = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`;
  }
  if (searchSelected === 'name') {
    api = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  }
  if (searchSelected === 'firstLetter') {
    if (name.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      api = `https://www.themealdb.com/api/json/v1/1/search.php?f=${name}`;
    }
  }
  const mealReq = await fetch(api)
    .then((response) => response.json())
    .then(({ meals }) => {
      if (meals.length === 1) {
        history.push(`/meals/${meals[0].idMeal}`);
      }
      return meals;
    })
    .catch((error) => {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      console.error(`Something is wrong ${error}`);
    });
  return mealReq;
}

export default fetchMeels;
