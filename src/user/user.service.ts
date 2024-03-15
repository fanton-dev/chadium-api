import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NoSuchUserException } from './exceptions/no-such-user.exception';
import { UserCreateFromDiscordDto } from './dtos/user-create-from-discord.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    // Get user information from the database
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getByIdOrThrow(id: string) {
    const user = await this.getById(id);

    if (!user) {
      throw new NoSuchUserException();
    }

    return user;
  }

  async getByEmail(email: string) {
    // Get user information from the database
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getByEmailOrThrow(email: string) {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new NoSuchUserException();
    }

    return user;
  }

  async getByDiscordId(discordId: string) {
    // Get user information from the database
    return this.prisma.user.findUnique({
      where: {
        discordId,
      },
    });
  }

  async getByDiscordIdOrThrow(discordId: string) {
    const user = await this.getByDiscordId(discordId);

    if (!user) {
      throw new NoSuchUserException();
    }

    return user;
  }

  async create(data: UserCreateFromDiscordDto) {
    return this.prisma.user.create({
      data,
    });
  }
}
