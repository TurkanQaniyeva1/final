import { FETCH_MENU_DATA_ERROR, FETCH_MENU_DATA_START, FETCH_MENU_DATA_SUCCESS } from "../actions/menuAction";

const initialState = {
  menuData: null,
  loading: false,
  error: null,
};

export const menuReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_MENU_DATA_START:
      return { ...state, loading: true, error: null };
    case FETCH_MENU_DATA_SUCCESS:
      return { ...state, loading: false, menuData: action.payload };
    case FETCH_MENU_DATA_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
