require('dotenv').config();
const path = require('path');
const express = require('express');
const ServerAPI = require('./datasources/server');

const {
  ApolloServer,
  PubSub,
  ForbiddenError,
} = require('apollo-server-express');
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
const { createServer } = require('http');

const server = new ApolloServer({
  typeDefs,
  context,
  resolvers,
  dataSources,
  subscriptions: {
    onConnect: (connectionParams) => {
      /* console.log(connectionParams);
      if (connectionParams.authToken) {
        return validateToken(connectionParams.authToken);
      }

      throw new ForbiddenError('Missing auth token'); */
      //can not set it up
    },
  },
});

const app = express();
server.applyMiddleware({ app });

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

const PORT = process.env.PORT || 4000;

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready on port ${PORT}${server.graphqlPath}`);
  console.log(
    `🚀 Subscriptions ready on port ${PORT}${server.subscriptionsPath}`
  );
});
