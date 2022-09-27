import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from './Recipes';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" />
      Drinks
      <Recipes title="Drink" />
      <Footer />
    </div>
  );
}

export default Drinks;
