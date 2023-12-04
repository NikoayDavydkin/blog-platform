/* eslint-disable semi */
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNoneAuthorised = () => {
  return (
    <div className="header__buttons">
      <Link to="/sign-in">
        <button className="header__buttons-sign-in">Sign in</button>
      </Link>
      <Link to="/sign-up">
        <button className="header__buttons-sign-up">Sign Up</button>
      </Link>
    </div>
  );
};

export default HeaderNoneAuthorised;
