import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
} from "../actions/userAction";

const initialState = {
  userData: null,
  users: [], 
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USER_START:
    case FETCH_USERS_START:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload }; // Yeni istifadəçilər saxlanılır
    case FETCH_USER_ERROR:
    case FETCH_USERS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
