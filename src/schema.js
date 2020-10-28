const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    userServers: [Server]
  }

  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayload!
    loginUser(data: UserCreateInput!): AuthPayload!

    createServer(serverName: String!): Server
    deleteServer(serverId: ID!): Server
    addServer(serverId: ID!): Server
    leaveServer(serverId: ID!): Server

    createChannel(data: CreateChannelInput!): Channel
    deleteChannel(data: DeleteChannelInput!): Channel
  }

  input UserCreateInput {
    name: String!
    password: String!
  }

  input CreateChannelInput {
    name: String!
    serverId: ID!
  }

  input DeleteChannelInput {
    channelId: ID
    serverId: ID!
  }

  type AuthPayload {
    token: String!
  }

  type Channel {
    id: ID!
    name: String!
    server: Server!
  }

  type Server {
    id: ID!
    name: String!
    owner: User!
    channels: [Channel]
    users: [User]
  }

  type User {
    id: ID!
    name: String!
    servers: [Server]
    adminOfServers: [Server]
  }

  type Message {
    id: ID!
    channel: Channel!
    username: String!
    msg: String
    date: DateTime
  }

  scalar DateTime
`;

module.exports = typeDefs;
