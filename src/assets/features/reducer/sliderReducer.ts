import { FETCH_SLIDER_DATA, FetchSliderDataAction, SliderData } from '../actions/sliderAction';

interface SliderState {
  sliderData: SliderData | null;
}

const initialState: SliderState = {
  sliderData: null,
};

export const sliderReducer = (
  state = initialState,
  action: FetchSliderDataAction
): SliderState => {
  switch (action.type) {
    case FETCH_SLIDER_DATA:
      return { ...state, sliderData: action.payload };
    default:
      return state;
  }
};

export default sliderReducer;
