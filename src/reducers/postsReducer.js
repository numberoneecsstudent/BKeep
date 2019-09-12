import {
  SAVE_POST_FAILURE,
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_START,
  GET_POSTS_SUCCESS,
  SAVE_YEAR_FAILURE,
  SAVE_YEAR_START,
  SAVE_YEAR_SUCCESS,
  GET_YEARS_FAILURE,
  GET_YEARS_START,
  GET_YEARS_SUCCESS
} from "../actions/index";

const initialState = {
  posts: [],
  savingPost: false,
  postError: "",
  gettingPostsError: null,
  gettingPosts: false,
  savingYear: false,
  gettingYears: false,
  gettingYearsError: false,
  postYears: [],
  yearError: null,
  savingPostError: null,
  savingYearsError: null
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POST_START:
      return {
        ...state,
        savingPostError: null,
        savingPost: true
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savingPost: false,
        savingPostError: null,
        posts: [...action.payload]
      };
    case SAVE_POST_FAILURE:
      return {
        ...state,
        savingPostError: "Error",
        savingPost: false
      };
    case GET_POSTS_START:
      return {
        ...state,
        gettingPostsError: null,
        gettingPosts: true
      };
    case GET_POSTS_SUCCESS:
      if (action.payload === null) {
        return {
          ...state,
          gettingPosts: false,
          gettingPostsError: null,
          posts: []
        };
      } else {
        return {
          ...state,
          gettingPosts: false,
          gettingPostsError: null,
          posts: [...action.payload]
        };
      }
    case GET_POSTS_FAILURE:
      return {
        ...state,
        gettingPostsError: "Error",
        savingPost: false
      };
    case SAVE_YEAR_START:
      return {
        ...state,
        savingYearsError: null,
        savingYear: true
      };
    case SAVE_YEAR_SUCCESS:
      return {
        ...state,
        savingYear: false,
        savingYearsError: null,
        postYears: [...action.payload]
      };
    case SAVE_YEAR_FAILURE:
      return {
        ...state,
        savingYearsError: "Error",
        savingYear: false
      };
    case GET_YEARS_START:
      return {
        ...state,
        gettingYearsError: null,
        gettingYears: true
      };
    case GET_YEARS_SUCCESS:
      if (action.payload === null) {
        return {
          ...state,
          gettingYears: false,
          gettingYearsError: null,
          postYears: []
        };
      } else {
        return {
          ...state,
          gettingYears: false,
          gettingYearsError: null,
          postYears: [...action.payload]
        };
      }
    case GET_YEARS_FAILURE:
      return {
        ...state,
        gettingYearsError: "Error",
        savingPost: false
      };
    default:
      return state;
  }
};
