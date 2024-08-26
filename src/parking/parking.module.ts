import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingEntity } from './entities/parking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingEntity])],
  controllers: [ParkingController],
  providers: [ParkingService],
})
export class ParkingModule {}
