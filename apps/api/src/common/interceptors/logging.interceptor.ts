import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();
    const { method, url } = request;
    const startTime = Date.now();

    // 可选：记录请求体（注意脱敏）
    // const body = request.body;

    return next.handle().pipe(
      tap(() => {
        const elapsed = Date.now() - startTime;
        const statusCode = response.statusCode;
        this.logger.log(`${method} ${url} ${statusCode} - ${elapsed}ms`);
      }),
      catchError((error: Error) => {
        const elapsed = Date.now() - startTime;
        this.logger.error(
          `${method} ${url} - ${elapsed}ms - Error: ${error.message}`,
          error.stack,
        );
        // 重新抛出错误，让后续的异常过滤器处理
        throw error;
      }),
    );
  }
}
