import {
    Controller,
    Post,
    Body,
    UseGuards,
    HttpStatus,
    HttpCode,
  } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UserRole } from 'src/users/service/user.role';
import { RolesGuard } from './roles.guard';
import { Roles } from './role.decoratior';

  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}

    
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() createAuthDto: SignInDto) {
      return this.authService.login(createAuthDto);
    }

    @Post('register-partner')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    registerPartner(@Body() createAuthDto: CreatePartnerDto) {
        return this.authService.registerEmployee(createAuthDto);
    }

    @Post('register-admin')
    registerAdmin(@Body() createAuthDto: CreatePartnerDto) {
        return this.authService.registerAdmin(createAuthDto);
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout() {
      return this.authService.logout();
    }
}