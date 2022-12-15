import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { Flex, Button, Box, Heading } from "rendition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { startNewFeed, removeFeed, selectFeeds } from "../../redux/feeds";

export const Feeds = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(selectFeeds);

  return (
    <Flex flexDirection="column">
      <Heading bold>Feeds:</Heading>
      <Box minHeight="50px">
        <Flex flexWrap="wrap" mt={1}>
          {feeds.map((feed) => (
            <Button
              // @ts-ignore
              icon={<FontAwesomeIcon icon={faCircleXmark} />}
              key={feed.id}
              mr={3}
              onClick={() => dispatch(removeFeed(feed.id))}
              plain
            >
              {feed.name}
            </Button>
          ))}
        </Flex>
      </Box>
      <Flex mt={3}>
        <Button
          // @ts-ignore
          icon={<FontAwesomeIcon icon={faPlusCircle} />}
          onClick={() => dispatch(startNewFeed())}
        >
          Create Feed
        </Button>
      </Flex>
    </Flex>
  );
};
