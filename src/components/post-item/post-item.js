/* eslint-disable semi */
import React from 'react';
import './post-item.css';
import { v4 as uuidv4 } from 'uuid';
import newDate from 'new-date';
import { Link } from 'react-router-dom';

import heart from '../../img/heart.png';
import heartActive from '../../img/heart-active.png';

const PostItem = ({ articleItem, putLike }) => {
  const { author, description, favorited, favoritesCount, slug, tagList, title, updatedAt } = articleItem;

  const { image, username } = author;

  const returnData = () => {
    const date = newDate(updatedAt);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });

    return `${month} ${day}, ${year}`;
  };

  let tagLocal = [];

  if (tagList.length > 4) {
    tagLocal = [...tagList.slice(0, 4)];
  } else {
    tagLocal = [...tagList];
  }

  const returnNone = (value) => {
    let str = value.replace(/\s/g, '');

    if (str.length === 0) {
      return 'none';
    } else {
      return value;
    }
  };

  const returnStringSlice = (value, number) => {
    if (value.length > number) {
      return value.substring(0, number);
    } else {
      return value;
    }
  };

  const toUpperUsername = () => {
    const name = username;
    const splitted = name.split('');
    const first = splitted[0].toUpperCase();
    const rest = [...splitted];
    rest.splice(0, 1);
    const result = [first, ...rest].join('');
    return result;
  };

  const onLikeClicked = () => {
    if (favorited) {
      putLike(slug, false);
    } else {
      putLike(slug, true);
    }
  };
  //updatedAt - надо реализовать
  return (
    <li className="post-list__post-item">
      <div className="post-list__content">
        <div className="post-list__title">
          <Link to={`/articles/${slug}`}>
            <span onClick={() => {}} className="post-list__title-text">
              {returnStringSlice(returnNone(title), 40)}
            </span>
          </Link>
          <img
            className="post-list__title-img"
            onClick={() => {
              onLikeClicked();
            }}
            src={favorited ? heartActive : heart}
            alt="like"
          />
          <span className="post-list__title-likes">{favoritesCount}</span>
        </div>
        <ul className="post-list__tags">
          {tagLocal.map((tag) => {
            return <li key={uuidv4()}>{returnStringSlice(returnNone(tag), 15)}</li>;
          })}
        </ul>
        <span className="post-list__text">{returnStringSlice(returnNone(description), 60)}</span>
      </div>
      <div className="post-list__user">
        <div className="post-list__user-text">
          <span className="post-list__user-text-name">{toUpperUsername()}</span>
          <span className="post-list__user-text-date">{returnData()}</span>
        </div>
        <img className="post-list__user-img" src={image} alt="avatar" />
      </div>
    </li>
  );
};

export default PostItem;
