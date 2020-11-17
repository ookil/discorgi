require('dotenv').config();
const { DataSource } = require('apollo-datasource');
const { UserInputError, ForbiddenError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils');
const { CHANNEL_ADDED, MESSAGE_ADDED } = require('../constants');
const { nanoid } = require('nanoid');

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

    return await this.prisma.server.delete({
      where: { id: serverId },
    });
  }

  async joinServer({ serverId }) {
    const user = auth(this.context);

    const server = await this.prisma.server.findOne({
      where: {
        id: serverId,
      },
    });

    if (!server) return null;

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

    if (userOnServer) return null;

    await this.prisma.usersOnServer.create({
      data: {
        server: { connect: { id: serverId } },
        user: { connect: { id: parseInt(user.id) } },
      },
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

    this.context.pubsub.publish(CHANNEL_ADDED, { channelAdded: newChannel });

    return newChannel;
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

    if (!isAdmin.length)
      throw new ForbiddenError('You cannot create new channels');

    await this.prisma.message.deleteMany({
      where: { channelId: serverId },
    });

    return await this.prisma.channel.delete({
      where: { id: parseInt(channelId) },
    });
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
        username: user.name,
        msg,
      },
    });

    this.context.pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage });

    return newMessage;
  }

  async getUserServers() {
    const user = auth(this.context);

    const usersOnServer = await this.prisma.usersOnServer.findMany({
      where: { userId: user.id },
    });

    const serverIds = usersOnServer.map((item) => item.serverId);

    const servers = await this.prisma.server.findMany({
      where: {
        id: {
          in: serverIds,
        },
      },
      orderBy: { position: 'asc' },
    });

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
    });

    const userIds = usersOnServer.map((item) => item.userId);

    return await this.prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
  }

  
}

module.exports = ServerAPI;
