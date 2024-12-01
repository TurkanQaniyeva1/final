export const FETCH_USER_START = "FETCH_USER_START";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_ERROR = "FETCH_USER_ERROR";

export const fetchUser = (email: string, password: string) => async (dispatch: (action: any) => void) => {
  const apiUrl = "https://6748a18c5801f5153591ac77.mockapi.io/epic-users/Users";

  dispatch({ type: FETCH_USER_START });

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const users = await response.json();

    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (user) {
      const formattedUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName || "defaultfirstname",
        lastName: user.lastName || "defaultlastname",
        gameName: user.gameName || "defaultgamename",
        password: user.password,
        avatar: user.avatar || "https://via.placeholder.com/150",
        balance: user.balance || 0,
        wishlist: user.wishlist || [],
        cart: user.cart || [],
        purchasedGames: user.purchasedGames || [],
      };

      localStorage.setItem("user", JSON.stringify(formattedUser));

      dispatch({ type: FETCH_USER_SUCCESS, payload: formattedUser });
    } else {
      dispatch({ type: FETCH_USER_ERROR, payload: "Invalid email or password" });
    }
  } catch (error: any) {
    dispatch({ type: FETCH_USER_ERROR, payload: error.message || "Unknown error occurred" });
  }
};
