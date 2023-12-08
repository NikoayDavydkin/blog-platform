/* eslint-disable semi */
import React from 'react';
import './articles-item.css';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import PostItem from '../post-item/post-item';

const ArticlesItem = ({ data, deleteArticle, userData, putLike }) => {
  const { body } = data;

  const returnStringSlice = (value, number) => {
    if (value.length > number) {
      return value.substring(0, number);
    } else {
      return value;
    }
  };

  return (
    <div className="app__articles-item articles-item">
      <PostItem putLike={putLike} articleItem={data} userData={userData} deleteArticle={deleteArticle} />
      <div className="articles-item__body">
        <ReactMarkdown>{returnStringSlice(body, 60)}</ReactMarkdown>
      </div>
    </div>
  );
};

export default withRouter(ArticlesItem);
