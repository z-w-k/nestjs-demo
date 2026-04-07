import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyRequest } from 'fastify';

interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    // 处理 HttpException
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === 'string') {
        message = response;
      } else {
        // 安全断言为已知结构
        const resp = response as HttpExceptionResponse;
        message = resp.message;
      }
    }
    // 处理普通 Error（非 HttpException）
    else if (exception instanceof Error) {
      // 生产环境下可以只记录错误类型，不暴露具体消息
      this.logger.error(exception.stack || exception.message);
      message = exception.message;
    }
    // 其他未知异常（极少数情况）
    else {
      this.logger.error('Unknown exception type', exception);
      message = 'Unknown error';
    }

    // 获取请求路径
    const request = ctx.getRequest<FastifyRequest>();
    const path = String(httpAdapter.getRequestUrl(request));

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: path,
      message: message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
