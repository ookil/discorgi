import { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(!!localStorage.getItem('token')); //casting it to boolean by using !!

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },

        channel(_, { args, toReference }) {
          return toReference({
            __typename: 'Channel',
            id: args.channelId,
          });
        },
        userServers: {
          merge(_, incoming) {
            return incoming;
          },
        },
        server: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Server: {
      fields: {
        users: {
          merge(_, incoming) {
            return [...incoming];
          },
        },
      },
    },
  },
});
