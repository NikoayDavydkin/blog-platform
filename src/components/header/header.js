/* eslint-disable semi */
import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

import HeaderAuthorised from './header-authorised';
import HeaderNoneAuthorised from './header-none-authorised';

const Header = ({ authorised, userData, logOut }) => {
  return (
    <header className="app__header header">
      <Link to="/">
        <span className="header__title">Realworld Blog</span>
      </Link>
      {authorised ? <HeaderAuthorised logOut={logOut} userData={userData} /> : <HeaderNoneAuthorised />}
    </header>
  );
};

export default Header;
