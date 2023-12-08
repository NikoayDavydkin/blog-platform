/* eslint-disable semi */

//loading
export const setLoading = (value) => {
  return {
    type: 'LOADING',
    value: value,
  };
};

//массив со статьями
export const setArticles = (value) => {
  return {
    type: 'ARTICLES',
    value: value,
  };
};

//последняя страница
export const setTotal = (value) => {
  return {
    type: 'TOTAL',
    value: value,
  };
};

//на какой мы странице
export const setPage = (value) => {
  return {
    type: 'PAGE',
    value: value,
  };
};

//id статьи
export const setArticlesItemId = (value) => {
  return {
    type: 'ARTICLES_ITEM_ID',
    value: value,
  };
};

//статья
export const setArticlesItem = (value) => {
  return {
    type: 'ARTICLES_ITEM',
    value: value,
  };
};

//проверка в системе
export const setAuthorised = (value) => {
  return {
    type: 'AUTHORISED',
    value: value,
  };
};

//данные пользователя
export const setUserData = (value) => {
  return {
    type: 'USER_DATA',
    value: value,
  };
};

//видимость кнопок
export const setTool = (value) => {
  return {
    type: 'TOOL',
    value: value,
  };
};
