import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { reducer as feedsReducer } from "./feeds";
import { reducer as subscriptionsReducer } from "./subscriptions";
import { rootSaga } from "./saga";

let sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    feeds: feedsReducer,
    subscriptions: subscriptionsReducer
  },
  middleware: [
    ...getDefaultMiddleware({ serializableCheck: false, thunk: false }),
    sagaMiddleware
  ]
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
