import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAction } from "@reduxjs/toolkit";
import { Feed, FeedsState } from "./types";

const initialState: FeedsState = {
  feeds: []
};

export const feedsSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    addFeed: (state, action: PayloadAction<Feed>) => {
      state.feeds.push(action.payload);
    },
    removeFeed: (state, action: PayloadAction<string>) => {
      state.feeds = state.feeds.filter((feed) => feed.id !== action.payload);
    }
  }
});

export const startNewFeed = createAction("feeds/startNew");

export const { addFeed, removeFeed } = feedsSlice.actions;

export const reducer = feedsSlice.reducer;
