import { createZodDto } from 'nestjs-zod';
import { UserCreateWithoutPostsInputObjectZodSchema } from 'src/generated/zod/schemas/objects/UserCreateWithoutPostsInput.schema';

export class CreateUserDto extends createZodDto(
  UserCreateWithoutPostsInputObjectZodSchema,
) {}
