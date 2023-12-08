/* eslint-disable indent */
/* eslint-disable semi */

export const reducer = (
  state = {
    //loading
    loading: true,
    //массив со статьями
    articles: [],
    //последняя страница
    total: null,
    //на какой мы странице
    page: 1,
    //id статьи
    articlesItemId: null,
    //статья
    articlesItem: null,
    //проверка в системе
    authorised: JSON.parse(localStorage.getItem('user')) ? true : false,
    //статья
    userData: JSON.parse(localStorage.getItem('user')),
    //видимость кнопок
    tool: false,
  },
  actions
) => {
  switch (actions.type) {
    case 'LOADING':
      return { ...state, loading: actions.value };
    case 'ARTICLES':
      return { ...state, articles: actions.value };
    case 'TOTAL':
      return { ...state, total: actions.value };
    case 'PAGE':
      return { ...state, page: actions.value };
    case 'ARTICLES_ITEM_ID':
      return { ...state, articlesItemId: actions.value };
    case 'ARTICLES_ITEM':
      return { ...state, articlesItem: actions.value };
    case 'AUTHORISED':
      return { ...state, authorised: actions.value };
    case 'USER_DATA':
      return { ...state, userData: actions.value };
    case 'TOOL':
      return { ...state, tool: actions.value };
    default:
      return state;
  }
};
