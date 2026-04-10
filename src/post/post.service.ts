import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreatePostDto } from './dto/create-post.dto';
import type { UpdatePostDto } from './dto/update-post.dto';

const DEFAULT_TAKE = 20;
const MAX_TAKE = 100;

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(skip = 0, take = DEFAULT_TAKE) {
    const t = Math.min(Math.max(take, 0), MAX_TAKE);
    return this.prisma.post.findMany({
      skip: Math.max(skip, 0),
      take: t,
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  create(dto: CreatePostDto) {
    return this.prisma.post.create({ data: dto });
  }

  update(id: number, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
