import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

Injectable();
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
    ]);
    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest();
    if (!request.headers?.authorization) throw new UnauthorizedException();
    const user: any = JwtService.prototype.decode(
      request.headers.authorization.split(' ')[1],
      { complete: true },
    );
    return requiredRoles.some((role) => user.payload.roles?.includes(role));
  }
}
