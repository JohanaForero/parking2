import { Module } from '@nestjs/common';
import { ParkingController } from './controller/parking.controller';
import { ParkingService } from './services/parking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parking } from './entities/parking.entity';
import { ParkingValidations } from './services/validations/ParkingValidations';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/auth/roles.guardia';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Parking])],
  controllers: [ParkingController],
  providers: [ParkingService, ParkingValidations, RolesGuard],
  exports: [ParkingService, ParkingValidations]
})
export class ParkingModule {}
