import { Resolvers } from "../__generated__/resolvers-types";

export const Message: Resolvers = {
  Message: {
    sentFrom: async ({ sentFrom, senderId }, _, { dataSources }) => {
      console.log(`[DEBUG] sentFrom senderId: ${senderId}`);
      const sender = await dataSources.db.getUserDetails(sentFrom ?? senderId);
      return sender;
    },
    sentTo: async ({ sentTo, receiverId }, _, { dataSources }) => {
      console.log(`[DEBUG] sentTo receiverId: ${receiverId}`);
      const receiver = await dataSources.db.getUserDetails(sentTo ?? receiverId);
      return receiver;
    }
  }
}