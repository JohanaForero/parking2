import { Injectable, ExecutionContext, ForbiddenException, CanActivate, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles, ROLES_KEY } from './roles.decorator';
import { Role } from './role.enum';
import { JwtPayload } from './JwtPayload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService,) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context.switchToHttp().getRequest());
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    
    const token = this.extractTokenFromHeader(request);
    const decode = await this.jwtService.verifyAsync(token);
    request.user = decode;

    return roles.some(role => request.user.role?.includes(role)) ? true
    : (() => {throw new HttpException('rol no permitido', HttpStatus.FORBIDDEN)}) ();

  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;

  }
}
