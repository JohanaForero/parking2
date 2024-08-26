import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './parking/entities/parking.entity';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
