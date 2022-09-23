export const addUserLocalStorage = (user) => localStorage
  .setItem('user', JSON.stringify(user));

export const addMealsLocalStorage = (meals) => localStorage.setItem('mealsToken', meals);

export const addDrinksLocalStorage = (drinks) => localStorage
  .setItem('drinksToken', drinks);
