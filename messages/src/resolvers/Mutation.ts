import { Resolvers } from "../__generated__/resolvers-types";

export const Mutation: Resolvers = {
  Mutation: {
    createConversation: async (_, { recipientId }, { dataSources, userId }) => {
      console.log(`[DEBUG] createConversation: ${recipientId} and ${userId}`);
      return dataSources.db.createNewConversation({ userId, recipientId })
    },
    sendMessage: async (_, { message }, { dataSources, userId, pubsub }) => {

      const { conversationId, text } = message;
      console.log(`[DEBUG] sendMessage: ${conversationId} ${text}  and ${userId}`);
      //const sender = await dataSources.db.getUserDetails(userId);
      //const receiver = await dataSources.db.getUserDetails(conversationId.split('-')[0] === userId ? conversationId.split('-')[1] : conversationId.split('-')[0]);
      //const conversation = await dataSources.db.findUserConversationWithRecipient({ recipientId: receiver.id, userId })
      //if (!conversation) {
        //throw new Error('Conversation does not exist - Message NOT sent');
      //}
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

      // Issue new message event for subscription
      await pubsub.publish('NEW_MESSAGE_SENT', {
        messageInConversation: {
          id,
          text: messageText,
          sentFrom,
          sentTo,
          sentTime,
        },
        conversationId,
      });

      // Return all of the message that was created
      return messagePayload;
    }
  }
}
