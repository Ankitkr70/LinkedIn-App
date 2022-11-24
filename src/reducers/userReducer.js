import { SET_USER } from "../actions/actionType";
const INIT_STATE = {
  user: null,
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default userReducer;
