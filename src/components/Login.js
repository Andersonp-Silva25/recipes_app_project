import React from 'react';

function Login() {
  return (
    <form>
      <h1>Recipe App</h1>
      <label htmlFor="email">
        Email
        <input
          type="text"
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
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
