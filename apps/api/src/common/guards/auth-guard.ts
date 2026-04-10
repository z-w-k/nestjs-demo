import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

/**
 * 占位守卫：在接入 AuthService / JWT 前默认拒绝。
 * 需要鉴权时在 AppModule 注册并注入校验逻辑。
 */
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    this.extractToken(request);
    return false;
  }

  private extractToken(request: FastifyRequest): string | undefined {
    const auth = request.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
      return undefined;
    }
    return auth.slice(7);
  }
}
