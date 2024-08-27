import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Asegúrate de que ConfigModule está importado aquí
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          algorithm: 'RS256',
        },
      }),
    }),
    PassportModule,
  ],
  providers: [AuthService,  JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

