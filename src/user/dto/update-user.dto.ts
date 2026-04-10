import { createZodDto } from 'nestjs-zod';
import { UserCreateWithoutPostsInputObjectZodSchema } from 'src/generated/zod/schemas/objects/UserCreateWithoutPostsInput.schema';

const UpdateUserSchema = UserCreateWithoutPostsInputObjectZodSchema.partial();

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
