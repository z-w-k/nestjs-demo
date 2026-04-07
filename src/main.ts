import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 自动将请求载荷转换为 DTO 实例
      whitelist: true, // 剔除 DTO 中未定义的属性
      forbidNonWhitelisted: true, // 存在未定义属性时抛出错误
      // transformOptions: {
      //   enableImplicitConversion: true, // 启用隐式类型转换（如字符串 "123" → 数字 123）
      // },
      stopAtFirstError: true, // 遇到第一个验证错误即停止
    }),
  );
  await app.listen(process.env.PORT ?? 3999);
}
bootstrap();
