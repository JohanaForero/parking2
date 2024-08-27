import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService) {
      super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log('Token:', token);

        if(token) {
            const decode = await this.jwtService.verifyAsync(token);
            console.log('Decoded:', decode);
            request.user = decode;
        
        } else {
          console.log('Token no encontrado');
          throw new HttpException('Token no proporcionado', HttpStatus.BAD_REQUEST);
        }
    
        return await super.canActivate(context) as boolean;
      }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') || [];
        return type === 'Bearer' ? token : undefined;
    }
}
