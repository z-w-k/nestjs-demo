import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { Role } from '../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 获取处理器和类上的 roles 元数据
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // 没有角色要求，允许访问
    }

    // 从请求对象中获取用户信息（假设已由 AuthGuard 填充）
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user = request.user; // 注意：需要类型扩展

    if (!user || !user.roles) {
      return false;
    }

    // 检查用户是否拥有所需角色之一
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
