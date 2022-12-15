import { useDispatch } from "react-redux";
// @ts-ignore
import { Txt, Flex, Divider, Button } from "rendition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "../../models";
import { removeSubscription } from "../../redux/subscriptions";

export const SubscriptionTab = ({
  subscription
}: {
  subscription: Subscription;
}) => {
  const dispatch = useDispatch();

  return (
    <Flex alignItems="left" flexDirection="column">
      <Button
        // @ts-ignore
        icon={<FontAwesomeIcon icon={faCircleXmark} />}
        onClick={() => dispatch(removeSubscription(subscription.id))}
        plain
        mt={2}
      >
        Unsubscribe
      </Button>
      {subscription.posts.map((post, idx) => (
        <Flex flexDirection="column" key={idx}>
          <Txt mt={3}>{post}</Txt>
          <Divider mt={2} />
        </Flex>
      ))}
    </Flex>
  );
};
