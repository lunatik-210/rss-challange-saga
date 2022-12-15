import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";

const selectSelf = (state: RootState) => state.feeds;

export const selectFeeds = createSelector(selectSelf, (state) => state.feeds);
