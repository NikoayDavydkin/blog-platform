/* eslint-disable semi */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import CreateArticle from './components/forms/create-article';
import EditProfile from './components/forms/edit-profile';
import SignIn from './components/forms/sign-in';
import SignUp from './components/forms/sign-up';
import Header from './components/header/header';
import PostList from './components/post-list/post-list';
import ArticlesItem from './components/articles-item/articles-item';
import { getResponse, getResponseToken, getResponseBody, getResponseBodyToken } from './services';

function App({
  loading,
  setLoading,
  articles,
  setArticles,
  total,
  setTotal,
  page,
  setPage,
  articlesItemId,
  setArticlesItemId,
  articlesItem,
  setArticlesItem,
  authorised,
  setAuthorised,
  userData,
  setUserData,
}) {
  //получить articles не вощел в систему
  useEffect(() => {
    async function getArticles() {
      const response = await getResponse(`articles?offset=${page * 20 - 20}`, 'GET');

      if (response.ok) {
        const data = await response.json();
        setTotal(data.articlesCount);
        setArticles(data.articles);
        setLoading(false);
      }
    }

    if (!userData && loading) {
      getArticles();
    }
  }, [page, userData, loading]);

  //получить articles вощел в систему

  useEffect(() => {
    async function getArticles() {
      const response = await getResponseToken(`articles?offset=${page * 20 - 20}`, 'GET', userData.token);

      if (response.ok) {
        const data = await response.json();
        setTotal(data.articlesCount);
        setArticles(data.articles);
        setLoading(false);
      }
    }
    if (userData && loading) {
      getArticles();
    }
  }, [page, userData, loading]);

  //открыть статью не в системе

  useEffect(() => {
    async function getArticlesItem() {
      const response = await getResponse(`articles/${articlesItemId}`, 'GET');
      if (response.ok) {
        const data = await response.json();
        setArticlesItem(data.article);
      }
    }

    if (!userData && articlesItemId) {
      getArticlesItem();
    }
  }, [articlesItemId, userData]);

  //открыть статью  в системе

  useEffect(() => {
    async function getArticlesItem() {
      const response = await getResponseToken(`articles/${articlesItemId}`, 'GET', userData.token);

      if (response.ok) {
        const data = await response.json();
        setArticlesItem(data.article);
      }
    }

    if (userData && articlesItemId) {
      getArticlesItem();
    }
  }, [articlesItemId, userData, loading]);

  // зарегать ползователя
  async function registeringNewUser(value) {
    let user = {
      user: {
        username: value.username,
        password: value.password,
        email: value.emailAddress,
      },
    };

    const response = await getResponseBody('users', 'POST', user);

    if (response.ok) {
      const data = await response.json();
      setUserData(data.user);
      setAuthorised(true);
      setLoading(true);
      localStorage.setItem('user', JSON.stringify(data.user));
    } else {
      alert('You already have an account');
    }
  }

  // войти в систему
  async function loginSystem(value) {
    let user = {
      user: {
        password: value.password,
        email: value.emailAddress,
      },
    };

    const response = await getResponseBody('users/login', 'POST', user);

    if (response.ok) {
      const data = await response.json();
      setUserData(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuthorised(true);
      setLoading(true);
    } else {
      alert('Invalid email or password');
    }
  }

  //редактировать профиль

  async function editProfile(value) {
    let newObj = {};

    for (let i in value) {
      if (value[i] !== '') {
        newObj[i] = value[i];
      }
    }

    let user = {
      user: { ...newObj },
    };

    const response = await getResponseBodyToken('user', 'PUT', user, userData.token);

    if (response.ok) {
      const data = await response.json();
      setUserData(data.user);
      setLoading(true);
    } else {
      alert('The data you entered is busy');
    }
  }

  //function поставить лайк

  async function putLike(id, value) {
    if (value && authorised) {
      const response = await getResponseToken(`articles/${String(id)}/favorite`, 'POST', userData.token);

      if (response.ok) {
        await response.json();
        setUserData(userData);
        setLoading(true);
      }
    } else if (authorised) {
      const response = await getResponseToken(`articles/${String(id)}/favorite`, 'DELETE', userData.token);

      if (response.ok) {
        await response.json();
        setUserData(userData);
        setLoading(true);
      }
    }
  }

  //function создать статью,  редкатировать статью

  async function postArticle(value, createArticle, id) {
    // создание
    if (createArticle) {
      let article = {
        article: {
          title: value.title,
          description: value.description,
          body: value.body,
          tagList: [...value.tags],
        },
      };

      const response = await getResponseBodyToken('articles', 'POST', article, userData.token);

      if (response.ok) {
        await response.json();
        setLoading(true);
      }

      //редактирование
    } else {
      let newObj = {};

      for (let i in value) {
        if (value[i] !== '') {
          newObj[i] = value[i];
        }
      }

      let article = {
        article: { ...newObj },
      };

      const response = await getResponseBodyToken(`articles/${String(id)}`, 'PUT', article, userData.token);

      if (response.ok) {
        await response.json();
        setLoading(true);
      } else {
        alert('None edit article');
      }
    }
  }

  async function deleteArticle(id) {
    await getResponseToken(`articles/${String(id)}`, 'DELETE', userData.token);

    setLoading(true);
  }

  //функция пагинации
  const buttonsOnClick = (value) => {
    setPage(value);
    setLoading(true);
  };

  //выйдти из системы

  const logOut = () => {
    localStorage.removeItem('user');
    setUserData();
    setAuthorised(false);
    setLoading(true);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Header logOut={logOut} userData={userData} authorised={authorised} />
        <Switch>
          <Route
            path="/articles/:id"
            render={(match) => {
              setArticlesItemId(match.match.params.id);
              if (articlesItem) {
                return (
                  <ArticlesItem
                    deleteArticle={deleteArticle}
                    userData={userData}
                    data={articlesItem}
                    putLike={putLike}
                  />
                );
              }
            }}
          />

          <Route path="/profile" render={() => <EditProfile editProfile={editProfile} />} />
          <Route
            path="/new-article"
            render={() => <CreateArticle postArticle={postArticle} createArticle={true} name={'Create new article'} />}
          />
          <Route
            path="/edit-article"
            render={() => (
              <CreateArticle
                postArticle={postArticle}
                createArticle={false}
                name={'Edit article'}
                dataArticles={articlesItem}
              />
            )}
          />
          <Route path="/sign-up" render={() => <SignUp registeringNewUser={registeringNewUser} />} />
          <Route path="/sign-in" render={() => <SignIn loginSystem={loginSystem} />} />
          <Route
            path="/articles"
            render={() => (
              <PostList buttonsOnClick={buttonsOnClick} total={total} articles={articles} putLike={putLike} />
            )}
          />
          <Route
            path="/"
            render={() => (
              <PostList putLike={putLike} buttonsOnClick={buttonsOnClick} total={total} articles={articles} />
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    articles: state.articles,
    total: state.total,
    page: state.page,
    articlesItemId: state.articlesItemId,
    articlesItem: state.articlesItem,
    authorised: state.authorised,
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { setLoading, setArticles, setTotal, setPage, setArticlesItemId, setArticlesItem, setAuthorised, setUserData } =
    bindActionCreators(actions, dispatch);

  return {
    setLoading: (value) => {
      setLoading(value);
    },
    setArticles: (value) => {
      setArticles(value);
    },
    setTotal: (value) => {
      setTotal(value);
    },
    setPage: (value) => {
      setPage(value);
    },
    setArticlesItemId: (value) => {
      setArticlesItemId(value);
    },
    setArticlesItem: (value) => {
      setArticlesItem(value);
    },
    setAuthorised: (value) => {
      setAuthorised(value);
    },
    setUserData: (value) => {
      setUserData(value);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
