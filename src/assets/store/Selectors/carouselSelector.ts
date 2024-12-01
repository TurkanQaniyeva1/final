import { createSelector } from "reselect";
import { RootState } from "../store";

export const selectCarouselItems = createSelector(
  (state: RootState) => state.carouselData?.items || [],
  (items) => items
);
