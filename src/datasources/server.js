require('dotenv').config();
const { DataSource } = require('apollo-datasource');
const { UserInputError, ForbiddenError } = require('apollo-server');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils');

class ServerAPI extends DataSource {
  constructor({ prisma }) {
    super();
    this.prisma = prisma;
  }

  initialize(config) {
    this.context = config.context;
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
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return { token };
  }

  async createServer({ serverName }) {
    const user = auth(this.context);

    const newServer = await this.prisma.server.create({
      data: {
        name: serverName,
        admin: {
          connect: {
            id: parseInt(user.id),
          },
        },
      },
    });

    await this.prisma.usersOnServer.create({
      data: {
        server: { connect: { id: parseInt(newServer.id) } },
        user: { connect: { id: parseInt(user.id) } },
      },
    });

    return newServer;
  }

  async deleteServer({ serverId }) {
    const user = auth(this.context);

    const channels = await this.prisma.channel.findMany({
      where: { serverId: parseInt(serverId) },
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
            serverId: parseInt(serverId),
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    return await this.prisma.server.delete({
      where: { id: parseInt(serverId) },
    });
  }

  async addServer({ serverId }) {
    const user = auth(this.context);

    const server = await this.prisma.server.findOne({
      where: {
        id: parseInt(serverId),
      },
    });

    if (!server) return null;

    const userOnServer = await this.prisma.usersOnServer.findFirst({
      where: {
        AND: [
          {
            serverId: parseInt(serverId),
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
        server: { connect: { id: parseInt(serverId) } },
        user: { connect: { id: parseInt(user.id) } },
      },
    });

    return await this.prisma.server.findOne({
      where: { id: parseInt(serverId) },
    });
  }

  async leaveServer({ serverId }) {
    const user = auth(this.context);

    await this.prisma.usersOnServer.deleteMany({
      where: {
        AND: [
          {
            serverId: parseInt(serverId),
          },
          {
            userId: user.id,
          },
        ],
      },
    });

    return await this.prisma.server.findOne({
      where: { id: parseInt(serverId) },
    });
  }

  async createChannel({ data: { name, serverId } }) {
    const user = auth(this.context);

    const isAdmin = await this.prisma.server.findMany({
      where: {
        AND: [
          {
            id: parseInt(serverId),
          },
          {
            adminId: user.id,
          },
        ],
      },
    });

    if (!isAdmin.length)
      throw new ForbiddenError('You cannot create new channels');

    return await this.prisma.channel.create({
      data: {
        name,
        server: { connect: { id: parseInt(serverId) } },
      },
    });
  }

  async deleteChannel({ data: { channelId, serverId } }) {
    const user = auth(this.context);

    const isAdmin = await this.prisma.server.findMany({
      where: {
        AND: [
          {
            id: parseInt(serverId),
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
      where: { channelId: parseInt(serverId) },
    });

    return await this.prisma.channel.delete({
      where: { id: parseInt(channelId) },
    });
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
