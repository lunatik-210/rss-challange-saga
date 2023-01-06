import { reducer, addFeed, removeFeed } from "../feeds";
import { generateFeed } from "../../utils";

describe("Feeds", () => {
  const state = { feeds: [] };
  const feed = generateFeed();

  it('should add new feed', () => {
    const newState = reducer(state, addFeed(feed));
    expect(newState).toEqual({
      feeds: [feed]
    })
  });

  it('should remove feed by id', () => {
    const newState = reducer(state, removeFeed(feed.id));
    expect(newState).toEqual({
      feeds: []
    });
  });
});
