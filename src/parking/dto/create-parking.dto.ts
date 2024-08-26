import { IsNotEmpty, IsString, Validate } from "class-validator";
import { ParkingValidations } from "../services/validations/ParkingValidations";
export class CreateParkingDto {
    @IsString()
    @IsNotEmpty({ message: 'El socio es obligatorio.' })
    partnerId: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @Validate(ParkingValidations, { message: 'El nombre del parking ya existe.' })
    name: string;

    @IsNotEmpty({ message: 'El costo por hora es obligatorio.' })
    costPerHour: number;
    
    @IsNotEmpty({ message: 'El número de lotes es obligatorio.' })
    numberOfParkingLots: number;
}
