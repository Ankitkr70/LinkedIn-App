import { FETCH_POSTS, SET_LOADING } from "../actions/actionType";
const INIT_STATE = {
  posts: [],
  loading: false,
};
const postReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    default:
      return state;
  }
};

export default postReducer;
