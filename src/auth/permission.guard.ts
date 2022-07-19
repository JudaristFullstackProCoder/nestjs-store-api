import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userperms: string[] = Object.values(
      request?.session?.user?.permissions,
    );
    permissions.forEach((perms: string) => {
      if (userperms.includes(perms)) {
        return true;
      }
    });
    return false;
  }
}
