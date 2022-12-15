export type Subscription = {
  id: string;
  feedName: string;
  posts: string[];
  release?: Function;
};

export interface SubscriptionsState {
  subscriptions: Subscription[];
}

export interface AddPostActionProps {
  subscription: Subscription;
  post: string;
}
