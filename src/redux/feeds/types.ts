export type Feed = {
  name: string;
  id: string;
  minTimeout: number;
  maxTimeout: number;
};

export interface FeedsState {
  feeds: Feed[];
}
