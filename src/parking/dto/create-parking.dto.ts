import { IsNotEmpty, IsString, Validate } from "class-validator";
import { ParkingValidations } from "../services/validations/ParkingValidations";
export class CreateParkingDto {
    @IsString()
    partnerId: string;
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @Validate(ParkingValidations, { message: 'El nombre del parking ya existe.' })
    name: string;
    costPerHour: number;
    numberOfParkingLots: number;
}
