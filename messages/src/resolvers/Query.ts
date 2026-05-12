import { Resolvers } from "../__generated__/resolvers-types";

export const Query: Resolvers = {
  Query: {
    conversations: async (_, __, { dataSources, userId }) => {
      console.log(`[DEBUG] Querying conversations for user ${userId}`);
      return dataSources.db.findUserConversations(userId);
    },
    conversation: async (_, { recipientId }, { dataSources, userId }) => {
      console.log(`[DEBUG] Querying conversation for user ${userId} and recipient ${recipientId}`);
      return dataSources.db.findUserConversationWithRecipient({ recipientId, userId });
    }
  }
}
