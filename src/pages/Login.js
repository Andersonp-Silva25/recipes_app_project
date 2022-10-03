import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  addUserLocalStorage,
  addMealsLocalStorage,
  addDrinksLocalStorage,
} from '../services/storage';
import '../style/Login.css';
import LOGO from '../images/logo-Recipes-App.png';
import TOMATE from '../images/tomate.png';

function Login() {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const history = useHistory();

  const goToMeals = () => {
    history.push('/meals');
  };

  const validateEmail = (emailCorrect) => {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(emailCorrect);
  };

  const validatePassword = (passwordCorrect) => {
    const minCharacter = 6;
    const verifyPassword = passwordCorrect.length > minCharacter;
    return verifyPassword;
  };

  const emailInput = validateEmail(emailValue);

  const passwordInput = validatePassword(passwordValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserLocalStorage({ email: emailValue });
    addMealsLocalStorage('1');
    addDrinksLocalStorage('1');
    goToMeals();
  };

  return (
    <main>
      <div className="background-img">
        <img src={ LOGO } alt="logo" className="logo" />
      </div>
      <img src={ TOMATE } alt="tomate" className="tomate" />
      <div className="container-form">
        <form onSubmit={ handleSubmit } className="form-login">
          <h1>Recipe App</h1>
          <label htmlFor="email">
            <input
              type="text"
              value={ emailValue }
              onChange={ ({ target }) => setEmailValue(target.value) }
              data-testid="email-input"
              id="email"
              placeholder="Email"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              data-testid="password-input"
              id="password"
              value={ passwordValue }
              onChange={ ({ target }) => setPasswordValue(target.value) }
              placeholder="Password"
            />
          </label>
          <div className="position-btn">
            <button
              type="submit"
              data-testid="login-submit-btn"
              disabled={ !(emailInput && passwordInput) }
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
