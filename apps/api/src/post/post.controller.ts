/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { postContract } from '@repo/contracts';
import { PostService } from './post.service';

const postRoutes = postContract as any;

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @TsRestHandler(postRoutes.findMany)
  findAll(): any {
    return tsRestHandler(postRoutes.findMany, async ({ query }: any) => {
      const skip = query.skip ? Number(query.skip) : 0;
      const take = query.take ? Number(query.take) : undefined;
      const posts = await this.postService.findAll(skip, take);

      return { status: 200, body: posts };
    });
  }

  @TsRestHandler(postRoutes.findOne)
  findOne(): any {
    return tsRestHandler(postRoutes.findOne, async ({ params }: any) => {
      const post = await this.postService.findOne(Number(params.id));
      return { status: 200, body: post };
    });
  }

  @TsRestHandler(postRoutes.create)
  @HttpCode(HttpStatus.CREATED)
  create(): any {
    return tsRestHandler(postRoutes.create, async ({ body }: any) => {
      const post = await this.postService.create(body);
      return { status: 201, body: post };
    });
  }

  @TsRestHandler(postRoutes.update)
  update(): any {
    return tsRestHandler(postRoutes.update, async ({ params, body }: any) => {
      const post = await this.postService.update(Number(params.id), body);
      return { status: 200, body: post };
    });
  }

  @TsRestHandler(postRoutes.remove)
  remove(): any {
    return tsRestHandler(postRoutes.remove, async ({ params }: any) => {
      const post = await this.postService.remove(Number(params.id));
      return { status: 200, body: post };
    });
  }
}
