import { expectSaga } from "redux-saga-test-plan";
import { combineReducers } from "redux";
import { rootSaga, runNewFeedSaga, createSubscriptionSaga } from "../saga";
import { reducer as feedsReducer, startNewFeed } from "../feeds";
import { reducer as subscriptionsReducer, createSubscription } from "../subscriptions";
import { generateFeed } from "../../utils";

describe("Sagas", () => {
  it('dispatch(startNewFeed) should generate new random feed', () => {
    return expectSaga(rootSaga)
      .withReducer(combineReducers({
        feeds: feedsReducer,
        subscriptions: subscriptionsReducer,
      }))
      .put.like({ action: { type: 'feeds/addFeed' } })
      .fork.fn(runNewFeedSaga)
      .dispatch(startNewFeed())
      .silentRun()
      .then((result) => {
        expect(result.storeState.feeds.feeds.length).toEqual(1);
      });
  });

  it('dispatch(createSubscription) should assign subscription to feed', () => {
    const feedName = 'autonomous_rose';
    const state = {
      feeds: { feeds: [ generateFeed() ] },
      subscriptions: { subscriptions: [] }
    };

    return expectSaga(rootSaga)
      .withReducer(combineReducers({
        feeds: feedsReducer,
        subscriptions: subscriptionsReducer,
      }))
      .withState(state)
      .put.like({ action: { type: 'subscriptions/addSubscription' } })
      .put.like({ action: { type: 'subscriptions/updateSubscription' } })
      .fork.fn(createSubscriptionSaga)
      .dispatch(createSubscription({
        dispatch: () => null,
        feedName: feedName
      }))
      .silentRun()
      .then((result) => {
        expect(result.storeState.subscriptions.subscriptions.length).toEqual(1);
      });
  });
});
