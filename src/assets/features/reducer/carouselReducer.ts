const initialState = {
    carouselData: { items: [] },
    loading: false,
    error: null,
  };
  
  export const carouselReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_CAROUSEL_DATA_START':
        return { ...state, loading: true, error: null };
      case 'FETCH_CAROUSEL_DATA':
        return { ...state, loading: false, carouselData: action.payload };
      case 'FETCH_CAROUSEL_DATA_ERROR':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  