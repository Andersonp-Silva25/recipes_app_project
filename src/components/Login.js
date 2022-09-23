import React, { useState } from 'react';
import {
  addUserLocalStorage,
  addMealsLocalStorage,
  addDrinksLocalStorage,
} from '../services/storage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (emailCorrect) => {
    const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return emailRegex.test(emailCorrect);
  };

  const validatePassword = (passwordCorrect) => {
    const minCharacter = 6;
    const verifyPassword = passwordCorrect.length > minCharacter;
    return verifyPassword;
  };

  const emailInput = validateEmail(email);

  const passwordInput = validatePassword(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUserLocalStorage({ email: email });
    addMealsLocalStorage('1');
    addDrinksLocalStorage('1');
  };

  //   const button = emailInput && passwordInput;
  // if (emailInput && passwordInput) {
  //   setButtonDisabled(false);
  // } else {
  //   setButtonDisabled(true);
  // }

  return (
    <form onSubmit={ handleSubmit }>
      <h1>Recipe App</h1>
      <label htmlFor="email">
        Email
        <input
          type="text"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          data-testid="email-input"
          id="email"
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          data-testid="password-input"
          id="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(emailInput && passwordInput) }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
