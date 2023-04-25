import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RolesEnum } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const requireRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      'roles',
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!requireRoles) {
      return true;
    }

    const { user } = ctx.getContext().req;

    return requireRoles.some((role) => user?.roles?.includes(role));
  }
}
