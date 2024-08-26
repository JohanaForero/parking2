import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';
import { ParkingEntity } from './parking/entities/parking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin1',
      password: 'password',
      database: 'parking2',
      entities: [ParkingEntity],
      synchronize: true,
    }),
    ParkingModule,
  ],
})
export class AppModule {}
