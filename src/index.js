require('dotenv').config();

const { ApolloServer, PubSub } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const ServerAPI = require('./datasources/server');

const prisma = new PrismaClient();
const pubsub = new PubSub();

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
});

server
  .listen({
    port: process.env.PORT || 4000,
  })
  .then(({ url }) => console.log(`Server is running at ${url}`));
