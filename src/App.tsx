// @ts-ignore
import { Flex, Divider } from "rendition";
import { Feeds, Subscriptions } from "./components";

export default function App() {
  return (
    <Flex flexDirection="column">
      <Feeds />
      <Divider mt={3} mb={3} />
      <Subscriptions />
    </Flex>
  );
}
