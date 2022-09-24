import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import RecipesContext from '../context/RecipesContext';

function Header(props) {
  const { filter, setFilter, isDisplay, setIsDisplay } = useContext(RecipesContext);
  const { title } = props;

  const history = useHistory();

  const goToProfile = () => history.push('/profile');

  const handleClickFilter = () => {
    if (isDisplay) {
      setIsDisplay(false);
    } else {
      setIsDisplay(true);
    }
  };

  console.log(filter);

  return (
    <div>
      {isDisplay && (
        <input
          type="text"
          data-testid="search-input"
          value={ filter }
          onChange={ ({ target }) => setFilter(target.value) }
        />
      )}
      <h1 data-testid="page-title">{title}</h1>
      <button type="button" onClick={ goToProfile }>
        <img src={ ProfileIcon } data-testid="profile-top-btn" alt="Profile Top Icon" />
      </button>
      { (title === 'Meals' || title === 'Drinks')
      && (
        <button
          onClick={ handleClickFilter }
          type="button"
        >
          <img src={ SearchIcon } data-testid="search-top-btn" alt="Search Top Icon" />
        </button>)}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
