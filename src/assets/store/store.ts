import { configureStore } from '@reduxjs/toolkit';
import { menuReducer } from '../features/reducer/menuReducer';
import sliderReducer from '../features/reducer/sliderReducer';
import { carouselReducer } from '../features/reducer/carouselReducer';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    slider: sliderReducer,
    carousel: carouselReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
