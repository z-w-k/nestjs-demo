import { createZodDto } from 'nestjs-zod';
import { PostUncheckedCreateInputObjectZodSchema } from 'src/generated/zod/schemas/objects/PostUncheckedCreateInput.schema';

const PostCreateBodySchema = PostUncheckedCreateInputObjectZodSchema.omit({
  id: true,
});

export class CreatePostDto extends createZodDto(PostCreateBodySchema) {}
