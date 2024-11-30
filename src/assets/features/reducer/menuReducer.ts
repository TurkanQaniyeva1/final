import { FETCH_MENU_DATA, MenuData, FetchMenuDataAction } from '../actions/menuAction';

export interface MenuState {
  menuData: MenuData | null;
}

const initialState: MenuState = {
  menuData: null,
};

export const menuReducer = (state = initialState, action: FetchMenuDataAction): MenuState => {
  switch (action.type) {
    case FETCH_MENU_DATA:
      return {
        ...state,
        menuData: action.payload,
      };
    default:
      return state;
  }
};
