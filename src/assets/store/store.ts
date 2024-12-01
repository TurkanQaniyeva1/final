import { configureStore } from '@reduxjs/toolkit';
import { menuReducer } from './reducers/menuReducer';
import sliderReducer from './reducers/sliderReducer';
import { carouselReducer } from './reducers/carouselReducer';
import { userReducer } from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    slider: sliderReducer,
    carouselData: carouselReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
