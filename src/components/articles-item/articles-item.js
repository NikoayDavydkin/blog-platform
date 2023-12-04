/* eslint-disable semi */
import React, { useState } from 'react';
import './articles-item.css';
import newDate from 'new-date';
import { v4 as uuidv4 } from 'uuid';
import { withRouter, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import heartActive from '../../img/heart-active.png';
import heart from '../../img/heart.png';
import info from '../../img/info.png';

const ArticlesItem = ({ data, history, deleteArticle, userData }) => {
  const { author, body, description, favorited, favoritesCount, slug, tagList, title, updatedAt } = data;

  const { image, username } = author;

  const [tool, setTool] = useState(false);

  const returnNone = (value) => {
    let str = value.replace(/\s/g, '');

    if (str.length === 0) {
      return 'none';
    } else {
      return value;
    }
  };

  const returnClassToolTip = () => {
    if (tool) {
      return 'tooltip';
    } else {
      return 'tooltip hide';
    }
  };

  const returnClass = () => {
    if (userData) {
      if (username === userData.username) {
        return 'articles-item__buttons';
      } else {
        return 'articles-item__buttons hide';
      }
    } else {
      return 'articles-item__buttons hide';
    }
  };

  const returnStringSlice = (value, number) => {
    if (value.length > number) {
      return value.substring(0, number);
    } else {
      return value;
    }
  };

  const returnData = () => {
    const date = newDate(updatedAt);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });

    return `${month} ${day}, ${year}`;
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

  let tagLocal = [];

  if (tagList.length > 4) {
    tagLocal = [...tagList.slice(0, 4)];
  } else {
    tagLocal = [...tagList];
  }

  return (
    <div className="app__articles-item articles-item">
      <div className="articles-item__header">
        <div className="articles-item__header-content">
          <div className="articles-item__title">
            <h5>{returnStringSlice(returnNone(title), 40)}</h5>
            <img src={favorited ? heartActive : heart} alt="like" />
            <span>{favoritesCount}</span>
          </div>
          <ul className="articles-item__tags">
            {tagLocal.map((tag) => {
              return <li key={uuidv4()}>{returnStringSlice(returnNone(tag), 15)}</li>;
            })}
          </ul>
          <span className="articles-item__text">{returnStringSlice(returnNone(description), 80)}</span>
        </div>
        <div className="articles-item__header-profile">
          <div className="articles-item__user">
            <div className="articles-item__user-name">
              <h6>{toUpperUsername()}</h6>
              <span>{returnData()}</span>
            </div>
            <img src={image} alt="ava" className="articles-item__user-img" />
          </div>
          <div className={returnClass()}>
            <button
              className="articles-item__buttons-red .tooltip-button"
              onClick={() => {
                setTool(true);
              }}
            >
              Delete
            </button>
            {/*tool tip*/}
            <div className={returnClassToolTip()}>
              <div className="tooltip__header">
                <img src={info} alt="tooltip" />
                <span>Are you sure to delete this article?</span>
              </div>
              <div className="tooltip__footer">
                <button
                  onClick={() => {
                    setTool(false);
                  }}
                  className="tooltip__button-no"
                >
                  No
                </button>
                <button
                  onClick={() => {
                    setTool(false);
                    history.push('/');
                    deleteArticle(slug);
                  }}
                  className="tooltip__button-yes"
                >
                  Yes
                </button>
              </div>
            </div>

            <Link to="/edit-article">
              <button className="articles-item__buttons-green">Edit</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="articles-item__body">
        <ReactMarkdown>{returnStringSlice(body, 60)}</ReactMarkdown>
      </div>
    </div>
  );
};

export default withRouter(ArticlesItem);
