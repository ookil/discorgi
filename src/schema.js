const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getUser: AuthUser
    userServers: [Server]
    serverChannels(serverId: ID!): [Channel]
    serverUsers(serverId: ID!): [User]
  }

  type Subscription {
    channelAdded(serverId: ID!): Channel

    messageAdded(channelId: ID!): Message
  }

  type Mutation {
    signupUser(data: UserCreateInput!): AuthPayload!
    loginUser(data: UserCreateInput!): AuthPayload!

    createServer(data: CreateServerInput): Server
    deleteServer(serverId: ID!): Server
    joinServer(serverId: ID!): Server
    leaveServer(serverId: ID!): Server

    createChannel(data: CreateChannelInput!): Channel
    deleteChannel(data: DeleteChannelInput!): Channel

    createMessage(data: CreateMessageInput!): Message
  }

  type AuthUser {
    id: ID!
    name: String!
  }

  input CreateServerInput {
    serverName: String!
    icon: String
  }

  input CreateMessageInput {
    msg: String!
    channelId: ID!
    serverId: ID!
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
    position: Int
    channels: [Channel]
    users: [User]
    icon: String
    role: String
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
