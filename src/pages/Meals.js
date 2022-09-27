import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from './Recipes';

function Meals() {
  return (
    <div>
      <Header title="Meals" />
      Meals
      <Recipes title="Meal" />
      <Footer />
    </div>
  );
}

export default Meals;
