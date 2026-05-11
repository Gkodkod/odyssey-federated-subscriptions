import { withFilter } from "graphql-subscriptions";
import { Resolvers } from "../__generated__/resolvers-types";

export const Subscription: Resolvers = {
  Subscription: {
    messageInConversation: {
      // @ts-ignore
      subscribe: withFilter(
        (_, __, { pubsub }) => (pubsub as any).asyncIterator("NEW_MESSAGE_SENT"),
        (payload: any, variables: any) => {
          return payload.messageInConversation.conversationId === variables.id;
        }
      ),
    },
  },
};
