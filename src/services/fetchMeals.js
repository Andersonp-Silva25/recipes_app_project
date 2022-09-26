// https://www.themealdb.com/api/json/v1/1/

async function fetchMeels(searchSelected, name, setMealsArrays, history) {
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
  fetch(api)
    .then((response) => response.json())
    .then(({ meals }) => {
      console.log(meals);
      setMealsArrays(meals);
      if (meals.length === 1) {
        history.push(`/meals/${meals[0].idMeal}`);
      }
    })
    .catch((error) => console.error(`Something is wrong ${error}`));
}

export default fetchMeels;
