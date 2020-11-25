require('dotenv').config();
const ServerAPI = require('./datasources/server');

const { ApolloServer, PubSub, ForbiddenError } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const pubsub = new PubSub();

const validateToken = (auth) => {
  const token = auth.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (error) {
    throw new ForbiddenError('Invalid token');
  }
};

const dataSources = () => ({
  serverAPI: new ServerAPI({ prisma }),
});

const context = (req) => {
  return { ...req, pubsub };
};

const typeDefs = require('./schema');

const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  context,
  resolvers,
  dataSources,
  subscriptions: {
    onConnect: ({ authToken }) => {
      console.log('\x1b[36m%s\x1b[0m', 'authtoken: ' + authToken);
    },

    /* (connectionParams) => {
      console.log(connectionParams);
      if (connectionParams.authorization) {
        return validateToken(connectionParams.authorization);
      }

      throw new ForbiddenError('Missing auth token');
    }, */
  },
});

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => console.log(`Server is running at ${url}`));
