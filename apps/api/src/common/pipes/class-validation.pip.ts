import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClassValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // 如果 metatype 不是 DTO 类，则跳过
    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }

    // 将普通对象转换为 DTO 实例
    const object = plainToInstance(metatype, value);
    // 执行验证
    const errors = await validate(object);
    if (errors.length > 0) {
      // 抛出异常，中断请求
      throw new BadRequestException('Validation failed');
    }
    // 返回转换后的对象（以便控制器接收到类型正确的数据）
    return object;
  }

  private shouldValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
