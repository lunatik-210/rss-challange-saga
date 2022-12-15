import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 1,
    min: 1
  },
  wordsPerSentence: {
    max: 5,
    min: 4
  }
});

export const generateNews = () => lorem.generateParagraphs(1);
