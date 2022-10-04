import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer
      className="footerContainer"
      data-testid="footer"
      style={ { position: 'fixed', bottom: 0 } }
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="Icone Drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/meals">
        <img
          src={ mealIcon }
          alt="Icone Meal"
          data-testid="meals-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
