import { z } from 'zod';
import { IsString, IsInt } from 'class-validator';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDtoZod = z.infer<typeof createCatSchema>;

export class CreateCatDtoClass {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
