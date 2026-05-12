import { Resolvers } from "../__generated__/resolvers-types";

export const User: Resolvers = {
  User: {
    __resolveReference: async ({ id, ...attributes }, { dataSources }) => {
      const user = await dataSources.db.getUserDetails(id);
      return { ...attributes, ...user, id: user.username };
    },
    isOnline: ({ lastActiveTime, isLoggedIn }) => {
      const now = Date.now();
      const lastActiveDate = new Date(lastActiveTime).getTime();
      const difference = now - lastActiveDate;

      if (isLoggedIn && difference < 300000) {
        return true;
      }

      return false;
    },
  },
};
