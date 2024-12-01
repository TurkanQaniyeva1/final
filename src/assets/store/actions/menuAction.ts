export const FETCH_MENU_DATA_START = 'FETCH_MENU_DATA_START';
export const FETCH_MENU_DATA_SUCCESS = 'FETCH_MENU_DATA_SUCCESS';
export const FETCH_MENU_DATA_ERROR = 'FETCH_MENU_DATA_ERROR';

export const fetchMenuData = () => async (dispatch: (action: any) => void) => {
  const apiUrl = 'https://674b2d0f71933a4e8854a71b.mockapi.io/Menuitems';

  dispatch({ type: FETCH_MENU_DATA_START });

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch menu data');
    }

    const data = await response.json();

    const formattedData = {
      play: data
        .filter((item: any) => item.category === 'play')
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          link: item.link,
        })),
      discover: data
        .filter((item: any) => item.category === 'discover')
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          link: item.link,
        })),
      create: data
        .filter((item: any) => item.category === 'create')
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          link: item.link,
        })),
      distribute: data
        .filter((item: any) => item.category === 'distribute')
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          link: item.link,
        })),
    };

    dispatch({ type: FETCH_MENU_DATA_SUCCESS, payload: formattedData });
  } catch (error) {
    if (error instanceof Error) {
      dispatch({ type: FETCH_MENU_DATA_ERROR, payload: error.message });
    } else {
      dispatch({ type: FETCH_MENU_DATA_ERROR, payload: 'Unknown error occurred' });
    }
  }
};
