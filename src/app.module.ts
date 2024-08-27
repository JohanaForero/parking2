import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { ParkingModule } from './parking/parking.module';
import { Parking } from './parking/entities/parking.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin1',
      password: 'password',
      database: 'parking2',
      entities: [User, Parking],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    UsersModule,
    ParkingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
