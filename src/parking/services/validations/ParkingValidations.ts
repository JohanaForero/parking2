import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ParkingService } from "src/parking/services/parking.service";

@Injectable()
export class ParkingValidations {
  constructor(private readonly parkingService: ParkingService) {}

  async isParkingNameUnique(parkingName: string): Promise<boolean> {
    const parking = await this.parkingService.findByName(parkingName);
    return !parking;
  }
}

