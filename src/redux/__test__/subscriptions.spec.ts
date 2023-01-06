import {
  reducer,
  addSubscription,
  updateSubscription,
  removeSubscription,
  addPost,
} from "../subscriptions";
import { v4 as uuid } from "uuid";

const subscription = {
  id: uuid(),
  feedName: 'feedName',
  posts: []
};

describe("Subscriptions", () => {
  it('should add new subscription', () => {
    const state = { subscriptions: [] };
    const newState = reducer(state, addSubscription(subscription));
    expect(newState).toEqual({
      subscriptions: [subscription]
    });
  });

  it('should update fields inside existing subscription', () => {
    const newSubscription = {
      ...subscription,
      feedName: 'newFeedName'
    };
    const state = { subscriptions: [subscription] };
    const newState = reducer(state, updateSubscription(newSubscription));
    expect(newState).toEqual({
      subscriptions: [newSubscription]
    })
  });

  it('should add post to subscription', () => {
    const post = 'text';
    const newSubscription = {
      ...subscription,
      posts: [...subscription.posts, post]
    };
    const state = { subscriptions: [subscription] };
    const newState = reducer(state, addPost({
      post: 'text',
      subscription,
    }));
    expect(newState).toEqual({
      subscriptions: [newSubscription]
    })
  });

  it('should remove subscription by id', () => {
    const state = { subscriptions: [subscription] };
    const newState = reducer(state, removeSubscription(subscription.id));
    expect(newState).toEqual({
      subscriptions: []
    })
  });
});
