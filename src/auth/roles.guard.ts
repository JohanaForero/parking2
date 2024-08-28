import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decoratior';
import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private jwtService: JwtService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler()
      );
      if (!requiredRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      const decode = await this.jwtService.verifyAsync(token);
      request.user = decode;

      return requiredRoles.some(role => request.user.role?.includes(requiredRoles)) ? true
      : (() => {throw new HttpException('rolno permitido', HttpStatus.FORBIDDEN)}) ();
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') || [];
        return type === 'Bearer' ? token : undefined;
    }
  }