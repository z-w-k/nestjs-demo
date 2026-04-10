/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
import { Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { userContract } from '@repo/contracts';
import { UserService } from './user.service';

const userRoutes = userContract;

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TsRestHandler(userRoutes.findMany)
  async findAll(): any {
    return tsRestHandler(userRoutes.findMany, async ({ query }: any) => {
      const skip = query.skip ? Number(query.skip) : 0;
      const take = query.take ? Number(query.take) : undefined;
      const users = await this.userService.findAll(skip, take);

      return { status: 200, body: users };
    });
  }

  @TsRestHandler(userRoutes.findOne)
  findOne(): any {
    return tsRestHandler(userRoutes.findOne, async ({ params, query }: any) => {
      const user = await this.userService.findOne(
        Number(params.id),
        Boolean(query.includePosts),
      );

      return { status: 200, body: user };
    });
  }

  @TsRestHandler(userRoutes.create)
  @HttpCode(HttpStatus.CREATED)
  create(): any {
    return tsRestHandler(userRoutes.create, async ({ body }: any) => {
      const user = await this.userService.create(body);
      return { status: 201, body: user };
    });
  }

  @TsRestHandler(userRoutes.update)
  update(): any {
    return tsRestHandler(userRoutes.update, async ({ params, body }: any) => {
      const user = await this.userService.update(Number(params.id), body);
      return { status: 200, body: user };
    });
  }

  @TsRestHandler(userRoutes.remove)
  remove(): any {
    return tsRestHandler(userRoutes.remove, async ({ params }: any) => {
      const user = await this.userService.remove(Number(params.id));
      return { status: 200, body: user };
    });
  }
}
