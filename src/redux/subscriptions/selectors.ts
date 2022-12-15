import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

const selectSelf = (state: RootState) => state.subscriptions;

export const selectSubscriptions = createSelector(
  selectSelf,
  (state) => state.subscriptions
);
