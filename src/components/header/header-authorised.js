/* eslint-disable semi */
import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../img/avatar.png';

const HeaderAuthorised = ({ userData, logOut }) => {
  const toUpperUsername = () => {
    const name = userData.username;
    const splitted = name.split('');
    const first = splitted[0].toUpperCase();
    const rest = [...splitted];
    rest.splice(0, 1);
    const result = [first, ...rest].join('');
    return result;
  };
  return (
    <div className="header__buttons_authorised">
      <Link to="/new-article">
        <button className="header__buttons-create-article">Create article</button>
      </Link>
      <Link to="/profile">
        <h6>{toUpperUsername()}</h6>
      </Link>
      <Link to="/profile">
        <img src={userData.image ? userData.image : avatar} alt="avatar" />
      </Link>
      <Link to="/">
        <button
          className="header__buttons-log-out"
          onClick={() => {
            logOut();
          }}
        >
          Log out
        </button>
      </Link>
    </div>
  );
};

export default HeaderAuthorised;
