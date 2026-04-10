import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';

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

  create(dto: CreateUserDto) {
    return this.prisma.user.create({ data: dto });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
