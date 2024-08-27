import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './parking/entities/parking.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin1',
      password: 'password',
      database: 'parking2',
      entities: [Parking],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    ParkingModule,
    UsersModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
