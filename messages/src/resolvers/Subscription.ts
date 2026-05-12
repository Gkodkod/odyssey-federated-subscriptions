import { Resolvers } from '../__generated__/resolvers-types';
import { withFilter } from 'graphql-subscriptions';


export const Subscription: Resolvers = {
  Subscription: {
    messageInConversation: {
      subscribe: withFilter(
        (_, { id }, { pubsub }) => {
          console.log(`[DEBUG] Subscribing to conversation`);
          return (pubsub as any).asyncIterator('NEW_MESSAGE_SENT');
        },
        (payload, variables) => {
          const conversationId =
            (payload as any)?.conversationId ||
            (payload as any)?.messageInConversation?.conversationId;

          console.log(`[DEBUG] Subscribing to conversation ${conversationId}`);
          console.log(`[DEBUG] Filtering: ${conversationId} === ${variables.id}`);
          return conversationId === variables.id;
        }
      ),
    }
  },
};
