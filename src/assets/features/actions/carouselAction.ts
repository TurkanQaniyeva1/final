export const fetchCarouselData = (apiUrl: string) => async (dispatch: (action: any) => void) => {
    dispatch({ type: 'FETCH_CAROUSEL_DATA_START' });
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
  
      const formattedData = {
        items: data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          image: item.image,
          category: item.category,
          description: item.descr,
          media: item.media,
        })),
      };
  
      dispatch({ type: 'FETCH_CAROUSEL_DATA', payload: formattedData });
    } catch (error) {
      dispatch({ type: 'FETCH_CAROUSEL_DATA_ERROR', payload: error.message });
    }
  };
  