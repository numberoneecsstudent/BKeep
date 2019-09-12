import { POSTS_FILENAME, YEARS_FILENAME } from "../constants"

export const SAVE_POST_START = 'SAVE_POST_START';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';
export const savePost = (user, posts) => dispatch => {
  dispatch({ type: SAVE_POST_START });
  return user.putFile(POSTS_FILENAME, JSON.stringify(posts), { encrypt: true })
    .then(res => {
      dispatch({ type: SAVE_POST_SUCCESS, payload: posts });
    })
    .catch(err => {
      dispatch({ type: SAVE_POST_FAILURE, payload: err.message });
    });
};

export const GET_POSTS_START = 'GET_POSTS_START';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';
export const getPosts = (user) => dispatch => {
  dispatch({ type: GET_POSTS_START });
  return user.getFile(POSTS_FILENAME, { decrypt: true })
    .then(res => {
      dispatch({ type: GET_POSTS_SUCCESS, payload: JSON.parse(res) });
    })
    .catch(err => {
      dispatch({ type: GET_POSTS_FAILURE, payload: err.message });
    });
};

export const SAVE_YEAR_START = 'SAVE_YEAR_START';
export const SAVE_YEAR_SUCCESS = 'SAVE_YEAR_SUCCESS';
export const SAVE_YEAR_FAILURE = 'SAVE_YEAR_FAILURE';
export const saveYear = (user, years) => dispatch => {
  dispatch({ type: SAVE_YEAR_START });
  user.putFile(YEARS_FILENAME, JSON.stringify(years), { encrypt: true })
    .then(res => {
      dispatch({ type: SAVE_YEAR_SUCCESS, payload: years });
    })
    .catch(err => {
      dispatch({ type: SAVE_YEAR_FAILURE, payload: err.message });
    });
};

export const GET_YEARS_START = 'GET_YEARS_START';
export const GET_YEARS_SUCCESS = 'GET_YEARS_SUCCESS';
export const GET_YEARS_FAILURE = 'GET_YEARS_FAILURE';
export const getYears = (user) => dispatch => {
  dispatch({ type: GET_YEARS_START });
  return user.getFile(YEARS_FILENAME, { decrypt: true })
    .then(res => {
      dispatch({ type: GET_YEARS_SUCCESS, payload: JSON.parse(res) });
    })
    .catch(err => {
      dispatch({ type: GET_YEARS_FAILURE, payload: err.message });
    });
};