import { generateName } from "./generateName";
import { v4 as uuid } from "uuid";

export const generateFeed = (feed = {}) => ({
  id: uuid(),
  name: generateName(),
  minTimeout: 500,
  maxTimeout: 3000,
  ...feed,
});
