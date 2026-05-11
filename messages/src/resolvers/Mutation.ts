import { Resolvers } from "../__generated__/resolvers-types";

export const Mutation: Resolvers = {
  Mutation: {
    createConversation: async (_, { recipientId }, { dataSources, userId }) => {
      return dataSources.db.createNewConversation({ userId, recipientId })
    },
    /* UNCOMMENT LINES 9-33 */
    sendMessage: async (_, { message }, { dataSources, userId, pubsub }) => {
      const { conversationId, text } = message;
      const {
        id,
        text: messageText,
        sentFrom,
        sentTo,
        sentTime,
        ...messageAttributes
      } = await dataSources.db.sendMessageToConversation({
        conversationId,
        text,
        userId,
      });

      const messagePayload = {
        id,
        text: messageText,
        sentFrom,
        sentTo,
        sentTime,
        ...messageAttributes,
      };

      await pubsub.publish("NEW_MESSAGE_SENT", { messageInConversation: messagePayload });
    
      // Return all of the message that was created
      return messagePayload;
    }
  }
}
