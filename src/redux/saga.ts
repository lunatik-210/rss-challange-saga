import { takeEvery, put, fork, select, delay } from "redux-saga/effects";
import { random } from "lodash";
import { v4 as uuid } from "uuid";
import { selectFeeds, startNewFeed, addFeed } from "./feeds";
import {
  updateSubscription,
  createSubscription,
  addSubscription,
  addPost
} from "./subscriptions";
import { generateName, generateNews } from "../utils";
import { EventEmitter } from "../EventEmitter";
import { Feed } from "./feeds/types";

const eventEmitter = new EventEmitter();

function* runNewFeedSaga(feed: Feed) {
  while (true) {
    let feeds: Feed[] = yield select(selectFeeds);

    if (!feeds.find((f) => f.id === feed.id)) {
      break;
    }

    yield delay(random(feed.minTimeout, feed.maxTimeout));
    eventEmitter.emit(feed.name, generateNews());
  }
}

export function* startNewFeedSaga() {
  const newFeed = {
    name: generateName(),
    id: uuid(),
    minTimeout: 500,
    maxTimeout: 3000
  };

  yield put(addFeed(newFeed));
  yield fork(runNewFeedSaga, newFeed);
}

export function* createSubscriptionSaga({
  payload: { dispatch, feedName }
}: any) {
  const subscription = {
    id: uuid(),
    feedName,
    posts: []
  };

  yield put(addSubscription(subscription));

  const { release } = eventEmitter.subscribe(feedName, (post: string) => {
    dispatch(
      addPost({
        post,
        subscription
      })
    );
  });

  yield put(
    updateSubscription({
      ...subscription,
      release
    })
  );
}

export function* rootSaga() {
  yield takeEvery(startNewFeed, startNewFeedSaga);
  yield takeEvery(createSubscription, createSubscriptionSaga);
}
