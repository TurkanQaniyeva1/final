export const fetchSearchResults = (query: string) => async (dispatch: (action: any) => void) => {
    dispatch({ type: "FETCH_SEARCH_RESULTS_START" });
  
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
  
      const data = await response.json();
      dispatch({ type: "FETCH_SEARCH_RESULTS_SUCCESS", payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "FETCH_SEARCH_RESULTS_ERROR", payload: error.message });
      } else {
        dispatch({ type: "FETCH_SEARCH_RESULTS_ERROR", payload: "Unknown error occurred" });
      }
    }
  };
  
  const initialSearchState = {
    results: [],
    loading: false,
    error: null,
  };
  
  export const searchReducer = (state = initialSearchState, action: any) => {
    switch (action.type) {
      case "FETCH_SEARCH_RESULTS_START":
        return { ...state, loading: true, error: null };
      case "FETCH_SEARCH_RESULTS_SUCCESS":
        return { ...state, loading: false, results: action.payload };
      case "FETCH_SEARCH_RESULTS_ERROR":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  