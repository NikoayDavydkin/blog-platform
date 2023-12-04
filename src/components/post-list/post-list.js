/* eslint-disable semi */
import React from 'react';
import { Pagination } from 'antd';

import PostItem from '../post-item/post-item';
import './post-list.css';
const PostList = ({ articles, buttonsOnClick, total, putLike, getArticlesItem }) => {
  return (
    <ul className="app__post-list post-list">
      {articles.map((item) => {
        return <PostItem getArticlesItem={getArticlesItem} putLike={putLike} key={item.slug} articleItem={item} />;
      })}
      <li className="post-list__pagination">
        <Pagination
          defaultCurrent={1}
          onChange={(e) => {
            buttonsOnClick(e);
          }}
          pageSize={20}
          total={total}
        />
      </li>
    </ul>
  );
};

export default PostList;
