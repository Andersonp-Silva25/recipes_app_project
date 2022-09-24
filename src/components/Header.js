import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
// import RecipesContext from '../context/RecipesContext';
import SearchBar from './SearchBar';

function Header(props) {
  // const { filter, setFilter } = useContext(RecipesContext);
  const [isDisplay, setIsDisplay] = useState(false);
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

  return (
    <div>
      {isDisplay && (
        <SearchBar />
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
