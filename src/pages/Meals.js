import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from './Recipes';
import '../style/MealsAndDrinks.css';

function Meals() {
  return (
    <div>
      <Header title="Meals" />
      <Recipes title="Meal" />
      <Footer />
    </div>
  );
}

export default Meals;
