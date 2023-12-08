/* eslint-disable semi */
import React from 'react';
import './post-item.css';
import newDate from 'new-date';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import info from '../../img/info.png';
import heart from '../../img/heart.png';
import heartActive from '../../img/heart-active.png';
const PostItem = ({ articleItem, putLike, deleteArticle, userData, history, tool, setTool }) => {
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
    if (value) {
      let str = value.replace(/\s/g, '');

      if (str.length !== 0) {
        return value;
      }
    }

    return 'none';
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

  const returnClassToolTip = () => {
    if (tool) {
      return 'tooltip';
    } else {
      return 'tooltip hide';
    }
  };

  //updatedAt - надо реализовать
  return (
    <div className="post-list__post-item">
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
            return <li key={tagLocal.indexOf(tag)}>{returnStringSlice(returnNone(tag), 15)}</li>;
          })}
        </ul>
        <span className="post-list__text">{returnStringSlice(returnNone(description), 60)}</span>
      </div>
      {/*user block */}
      <div className="post-list__user-block ">
        <div className="post-list__user">
          <div className="post-list__user-text">
            <span className="post-list__user-text-name">{toUpperUsername()}</span>
            <span className="post-list__user-text-date">{returnData()}</span>
          </div>
          <img className="post-list__user-img" src={image} alt="avatar" />
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
          {/* tool tip */}
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
  );
};

const mapStateToProps = (state) => {
  return {
    tool: state.tool,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { setTool } = bindActionCreators(actions, dispatch);

  return {
    setTool: (value) => {
      setTool(value);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostItem));
