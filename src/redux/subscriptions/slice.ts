import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAction } from "@reduxjs/toolkit";
import { Subscription, SubscriptionsState, AddPostActionProps } from "./types";

const initialState: SubscriptionsState = {
  subscriptions: []
};

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    addSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscriptions.push(action.payload);
    },
    updateSubscription: (state, action: PayloadAction<Subscription>) => {
      state.subscriptions = state.subscriptions.map((subscription) =>
        subscription.id === action.payload.id ? action.payload : subscription
      );
    },
    removeSubscription: (state, action: PayloadAction<string>) => {
      const s = state.subscriptions.find(
        (subscription) => subscription.id === action.payload
      );

      if (s?.release) {
        s.release();
      }

      state.subscriptions = state.subscriptions.filter(
        (subscription) => subscription.id !== action.payload
      );
    },
    addPost: (state, action: PayloadAction<AddPostActionProps>) => {
      const s = state.subscriptions.find(
        (subscription) => subscription.id === action.payload.subscription.id
      );

      if (s) {
        s.posts.push(action.payload.post);
      }
    }
  }
});

export const createSubscription = createAction<any>("subscriptions/create");

export const {
  addSubscription,
  updateSubscription,
  removeSubscription,
  addPost
} = subscriptionsSlice.actions;

export const reducer = subscriptionsSlice.reducer;
