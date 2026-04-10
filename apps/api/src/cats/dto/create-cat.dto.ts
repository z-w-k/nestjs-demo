import { IsString, IsInt } from 'class-validator';

export class CreateCatDtoClass {
  @IsString()
  name!: string;

  @IsInt()
  age!: number;

  @IsString()
  breed!: string;
}
