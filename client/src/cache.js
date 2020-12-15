import { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(!!sessionStorage.getItem('token')); //casting it to boolean by using !!

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

        getMessages: {
          keyArgs: ['channelId'],
          merge(existing, incoming, { args }) {
            if (existing === undefined) {
              //for initial messages
              return incoming;
            }

            if (args.after && existing.messages) {
              return Object.assign({}, incoming, {
                messages: [...existing.messages, ...incoming.messages],
              });
            } else {
              return incoming;
            }
      
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
        channels: {
          merge(_, incoming) {
            return [...incoming];
          },
        },
      },
    },
  },
});
