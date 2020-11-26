const { withFilter } = require('apollo-server');
const { GraphQLDate } = require('graphql-iso-date');
const { CHANNEL_SUB, USER_SUB, MESSAGE_ADDED } = require('./constants');

module.exports = {
  Query: {
    getUser: (_, __, { dataSources }) => dataSources.serverAPI.getUser(),
    userServers: (_, __, { dataSources }) =>
      dataSources.serverAPI.getUserServers(),
    server: (_, { serverId }, { dataSources }) =>
      dataSources.serverAPI.getServer({ serverId }),

    getMessages: (_, { channelId, pageSize, after }, { dataSources }) =>
      dataSources.serverAPI.getMessages({ channelId, pageSize, after }),
  },

  Subscription: {
    channelSub: {
      subscribe: withFilter(
        (_, __, context) => context.pubsub.asyncIterator(CHANNEL_SUB),
        (payload, variables) => {
          return payload.channelSub.data.serverId === variables.serverId;
        }
      ),
    },
    userSub: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(USER_SUB),
        (payload, variables) => {
          console.log(payload.userSub);
          return payload.userSub.serverId === variables.serverId;
        }
      ),
    },

    messageAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator(MESSAGE_ADDED),
        (payload, variables) => {
          return (
            payload.messageAdded.channelId === parseInt(variables.channelId)
          );
        }
      ),
    },
  },

  Mutation: {
    signupUser: (_, { data }, { dataSources }) =>
      dataSources.serverAPI.createUser({ data }),

    loginUser: (_, { data }, { dataSources }) =>
      dataSources.serverAPI.loginUser({ data }),

    createServer: (_, { data }, { dataSources }) =>
      dataSources.serverAPI.createServer({ data }),

    deleteServer: (_, { serverId }, { dataSources }) =>
      dataSources.serverAPI.deleteServer({ serverId }),

    joinServer: (_, { serverId }, { dataSources }) =>
      dataSources.serverAPI.joinServer({ serverId }),

    leaveServer: (_, { serverId }, { dataSources }) =>
      dataSources.serverAPI.leaveServer({ serverId }),

    createChannel: (_, { data }, { dataSources }) =>
      dataSources.serverAPI.createChannel({ data }),

    deleteChannel: (_, { data }, { dataSources }) =>
      dataSources.serverAPI.deleteChannel({ data }),

    createMessage: (_, { data }, { dataSources }) =>
      dataSources.serverAPI.createMessage({ data }),
  },

  Server: {
    channels: (server, _, { dataSources }) =>
      dataSources.serverAPI.getServerChannels({ serverId: server.id }) || [],
    users: (server, _, { dataSources }) =>
      dataSources.serverAPI.getServerUsers({ serverId: server.id }) || [],
  },

  DateTime: GraphQLDate,
};
