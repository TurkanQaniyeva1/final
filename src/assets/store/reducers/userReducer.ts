import {
    FETCH_USER_START,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
  } from "../actions/userAction";
  
  const initialState = {
    userData: null,
    loading: false,
    error: null,
  };
  
  export const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_USER_START:
        return { ...state, loading: true, error: null };
      case FETCH_USER_SUCCESS:
        return { ...state, loading: false, userData: action.payload };
      case FETCH_USER_ERROR:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  