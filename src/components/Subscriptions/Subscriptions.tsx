import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { Tab, Tabs, Flex, DropDownButton, Heading, Button } from "rendition";
import { SubscriptionTab } from "./Subscription";
import { selectFeeds } from "../../redux/feeds";
import {
  selectSubscriptions,
  createSubscription
} from "../../redux/subscriptions";

export const Subscriptions = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(selectFeeds);
  const subscriptions = useSelector(selectSubscriptions);

  return (
    <Flex flexDirection="column">
      <Heading bold>Subscriptions:</Heading>
      <DropDownButton disabled={!feeds.length} mt={2} label="Subscribe" joined>
        <Flex flexWrap="wrap">
          {feeds.map((feed) => (
            <Button
              mt={2}
              mr={3}
              onClick={() =>
                dispatch(
                  createSubscription({
                    dispatch,
                    feedName: feed.name
                  })
                )
              }
              key={feed.id}
            >
              {feed.name}
            </Button>
          ))}
        </Flex>
      </DropDownButton>
      {!!subscriptions.length && (
        <Tabs>
          {subscriptions.map((subscription, idx) => (
            <Tab
              key={subscription.id}
              title={`${subscription.feedName} ${idx}`}
            >
              <SubscriptionTab
                subscription={subscription}
                key={subscription.id}
              />
            </Tab>
          ))}
        </Tabs>
      )}
    </Flex>
  );
};
