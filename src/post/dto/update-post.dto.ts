import { createZodDto } from 'nestjs-zod';
import { PostUncheckedUpdateInputObjectZodSchema } from 'src/generated/zod/schemas/objects/PostUncheckedUpdateInput.schema';

const UpdatePostSchema = PostUncheckedUpdateInputObjectZodSchema.partial().omit({
  id: true,
});

export class UpdatePostDto extends createZodDto(UpdatePostSchema) {}
