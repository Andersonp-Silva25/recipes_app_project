import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { title } = props;
  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <img src={ ProfileIcon } data-testid="profile-top-btn" alt="Profile Top Icon" />
      { (title === 'Meals' || title === 'Drinks')
      && <img src={ SearchIcon } data-testid="search-top-btn" alt="Search Top Icon" />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
