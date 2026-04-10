import { Injectable } from '@nestjs/common';
import type { CreateUserBody, UpdateUserBody } from '@repo/contracts';
import { PrismaService } from 'src/prisma/prisma.service';

const DEFAULT_TAKE = 20;
const MAX_TAKE = 100;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(skip = 0, take = DEFAULT_TAKE) {
    const t = Math.min(Math.max(take, 0), MAX_TAKE);
    return this.prisma.user.findMany({
      skip: Math.max(skip, 0),
      take: t,
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number, includePosts = false) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      ...(includePosts ? { include: { posts: true } } : {}),
    });
  }

  create(dto: CreateUserBody) {
    return this.prisma.user.create({ data: dto });
  }

  update(id: number, dto: UpdateUserBody) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
