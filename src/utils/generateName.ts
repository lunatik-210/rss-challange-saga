import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  names
} from "unique-names-generator";

export const generateName = () =>
  uniqueNamesGenerator({
    length: 2,
    dictionaries: [adjectives, colors, animals, names]
  });
