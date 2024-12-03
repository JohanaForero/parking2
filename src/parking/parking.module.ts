import { Module } from '@nestjs/common';
import { ParkingController } from './controller/parking.controller';
import { ParkingService } from './services/parking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { ParkingValidations } from './services/validations/ParkingValidations';
import { AuthModule } from 'src/auth/auth.module';
import { ParkingLot } from './entities/parkinglot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parking, ParkingLot]),
    AuthModule,
  ],
  controllers: [ParkingController],
  providers: [ParkingService, ParkingValidations],
  exports: [ParkingService, ParkingValidations]
})
export class ParkingModule {}
