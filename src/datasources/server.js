require('dotenv').config();
const { DataSource } = require('apollo-datasource');
const { UserInputError, ForbiddenError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth, paginateResults } = require('../utils');
const {
  MESSAGE_ADDED,
  CHANNEL_SUB,
  USER_SUB,
  SERVER_DELETED,
} = require('../constants');
const { nanoid } = require('nanoid');
const { DEFAULT_SERVER_ID } = require('../constants');

class ServerAPI extends DataSource {
  constructor({ prisma }) {
    super();
    this.prisma = prisma;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getUser() {
    const user = auth(this.context);

    return user;
  }

  async createUser({ data: { name, password } }) {
    const user = await this.prisma.user.findOne({ where: { name } });

    if (user) throw new UserInputError('User already exists');

    const salt = await bcrypt.genSalt(10);
    const newUser = await this.prisma.user.create({
      data: {
        name,
        password: await bcrypt.hash(password, salt),
      },
    });

    const payload = {
      user: {
        id: newUser.id,
        name: newUser.name,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    await this.prisma.usersOnServer.create({
      data: {
        server: { connect: { id: DEFAULT_SERVER_ID } },
        user: { connect: { id: parseInt(newUser.id) } },
      },
    });

    return { token };
  }

  async loginUser({ data: { name, password } }) {
    const user = await this.prisma.user.findOne({ where: { name } });

    if (!user) throw new UserInputError(`User doesn't exist`);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new ForbiddenError('Invalid credentials');

    const payload = {
      user: {
        id: user.id,
        name: user.name,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return { token };
  }

  async createServer({ data: { serverName, icon } }) {
    const user = auth(this.context);

    const newServer = await this.prisma.server.create({
      data: {
        id: nanoid(),
        name: serverName,
        icon,
        admin: {
          connect: {
            id: parseInt(user.id),
          },
        },
        channels: {
          create: { name: 'general' },
        },
      },
    });

    await this.prisma.usersOnServer.create({
      data: {
        server: { connect: { id: newServer.id } },
        user: { connect: { id: parseInt(user.id) } },
      },
    });

    return newServer;
  }

  async deleteServer({ serverId }) {
    const user = auth(this.context);
    const isAdmin = await this.prisma.server.findMany({
      where: {
        AND: [
          {
            id: serverId,
          },
          {
            adminId: user.id,
          },
        ],
      },
    });

    if (!isAdmin.length)
      throw new ForbiddenError('You cannot delete this server');

    const channels = await this.prisma.channel.findMany({
      where: { serverId },
    });

    const channelsIds = channels.map((item) => item.id);

    await this.prisma.message.deleteMany({
      where: {
        channelId: {
          in: channelsIds,
        },
      },
    });

    await this.prisma.channel.deleteMany({
      where: {
        id: {
          in: channelsIds,
        },
      },
    });

    await this.prisma.usersOnServer.deleteMany({
      where: {
        serverId,
      },
    });

    const deletedServer = await this.prisma.server.delete({
      where: { id: serverId },
    });

    this.context.pubsub.publish(SERVER_DELETED, {
      serverDeleted: deletedServer,
    });

    return deletedServer;
  }

  async joinServer({ serverId }) {
    const user = auth(this.context);

    const server = await this.prisma.server.findOne({
      where: {
        id: serverId,
      },
    });

    if (!server)
      throw new UserInputError(`The invite is invalid or has expired`);

    const userOnServer = await this.prisma.usersOnServer.findFirst({
      where: {
        AND: [
          {
            serverId,
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    if (userOnServer) throw new UserInputError('You already joined...');

    await this.prisma.usersOnServer.create({
      data: {
        server: { connect: { id: serverId } },
        user: { connect: { id: parseInt(user.id) } },
      },
    });

    this.context.pubsub.publish(USER_SUB, {
      userSub: { mutation: 'Added', data: user, serverId },
    });

    return await this.prisma.server.findOne({
      where: { id: serverId },
    });
  }

  async leaveServer({ serverId }) {
    const user = auth(this.context);

    await this.prisma.usersOnServer.deleteMany({
      where: {
        AND: [
          {
            serverId,
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    this.context.pubsub.publish(USER_SUB, {
      userSub: { mutation: 'Deleted', data: user, serverId },
    });

    return await this.prisma.server.findOne({
      where: { id: serverId },
    });
  }

  async createChannel({ data: { name, serverId } }) {
    const user = auth(this.context);

    const isAdmin = await this.prisma.server.findMany({
      where: {
        AND: [
          {
            id: serverId,
          },
          {
            adminId: user.id,
          },
        ],
      },
    });

    if (!isAdmin.length)
      throw new ForbiddenError('You cannot create new channels');

    const newChannel = await this.prisma.channel.create({
      data: {
        name,
        server: { connect: { id: serverId } },
      },
    });

    this.context.pubsub.publish(CHANNEL_SUB, {
      channelSub: { mutation: 'Added', data: newChannel },
    });

    return newChannel;
  }

  async updateChannel({ data: { channelId, name, serverId } }) {
    const user = auth(this.context);

    const isAdmin = await this.prisma.server.findMany({
      where: {
        AND: [
          {
            id: serverId,
          },
          {
            adminId: user.id,
          },
        ],
      },
    });

    if (!isAdmin.length)
      throw new ForbiddenError('You cannot create new channels');

    const updatedChannel = await this.prisma.channel.update({
      where: {
        id: parseInt(channelId),
      },
      data: {
        name,
      },
    });

    this.context.pubsub.publish(CHANNEL_SUB, {
      channelSub: { mutation: 'Updated', data: updatedChannel },
    });

    return updatedChannel;
  }

  async deleteChannel({ data: { channelId, serverId } }) {
    const user = auth(this.context);

    const isAdmin = await this.prisma.server.findMany({
      where: {
        AND: [
          {
            id: serverId,
          },
          {
            adminId: user.id,
          },
        ],
      },
    });

    if (!isAdmin.length) throw new ForbiddenError('You cannot delete channels');

    await this.prisma.message.deleteMany({
      where: { channelId: parseInt(channelId) },
    });

    const deletedChannel = await this.prisma.channel.delete({
      where: { id: parseInt(channelId) },
    });

    this.context.pubsub.publish(CHANNEL_SUB, {
      channelSub: { mutation: 'Deleted', data: deletedChannel },
    });

    return deletedChannel;
  }

  async createMessage({ data: { msg, channelId, serverId } }) {
    const user = auth(this.context);

    const userOnServer = await this.prisma.usersOnServer.findMany({
      where: {
        AND: [
          {
            userId: parseInt(user.id),
          },
          {
            serverId,
          },
        ],
      },
    });

    if (!userOnServer) throw new ForbiddenError('No access');

    const newMessage = await this.prisma.message.create({
      data: {
        channel: { connect: { id: parseInt(channelId) } },
        createdBy: { connect: { id: parseInt(user.id) } },
        msg,
      },
      include: {
        createdBy: true,
      },
    });

    this.context.pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage });

    return newMessage;
  }

  async getUserServers() {
    const user = auth(this.context);

    const usersOnServer = await this.prisma.usersOnServer.findMany({
      where: { userId: user.id },
      include: { server: true },
    });

    usersOnServer.sort((a, b) => a.createdAt - b.createdAt);

    const servers = usersOnServer.map((item) => item.server);

    servers.map((server) => {
      if (server.adminId === user.id) {
        server.role = 'ADMIN';
      } else {
        server.role = 'USER';
      }
      return server;
    });

    return servers;
  }

  async getServer({ serverId }) {
    auth(this.context);

    return await this.prisma.server.findOne({
      where: {
        id: serverId,
      },
    });
  }

  async getServerChannels({ serverId }) {
    return await this.prisma.channel.findMany({
      where: {
        serverId,
      },
    });
  }

  async getServerUsers({ serverId }) {
    const usersOnServer = await this.prisma.usersOnServer.findMany({
      where: { serverId },
      select: {
        server: {
          select: {
            adminId: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    usersOnServer.sort((item) => {
      if (item.server.adminId === item.user.id) {
        return -1;
      }
    });

    const users = usersOnServer.map((item) => item.user);

    return users;
  }

  async getMessages({ pageSize = 40, after, channelId }) {
    const allMessages = await this.prisma.message.findMany({
      where: {
        channelId: parseInt(channelId),
      },
      include: {
        createdBy: true,
      },
    });

    allMessages.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    const messages = paginateResults({ after, pageSize, results: allMessages });

    return {
      messages,
      cursor: messages.length ? messages[messages.length - 1].id : null,
      //if the cursor at the end of the paginated results is the same as the
      // last item in all_results, then there are no more results after
      hasMore: messages.length
        ? messages[messages.length - 1].id !==
          allMessages[allMessages.length - 1].id
        : false,
    };
  }
}

module.exports = ServerAPI;
