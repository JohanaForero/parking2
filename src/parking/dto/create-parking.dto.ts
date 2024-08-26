import { IsString, Validate } from "class-validator";
import { ParkingValidations } from "../services/validations/ParkingValidations";
export class CreateParkingDto {
    @IsString()
    partnerId: string;
    @IsString()
    @Validate(ParkingValidations)
    name: string;
    costPerHour: number;
    numberOfParkingLots: number;
}
