/* eslint-disable semi */
import React from 'react';
import { Pagination } from 'antd';

import PostItem from '../post-item/post-item';
import './post-list.css';
const PostList = ({ articles, buttonsOnClick, total, putLike }) => {
  return (
    <ul className="app__post-list post-list">
      {articles.map((item) => {
        return (
          <li className="post-list__li" key={item.slug}>
            <PostItem putLike={putLike} articleItem={item} />
          </li>
        );
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
