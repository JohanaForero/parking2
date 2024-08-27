import { IsNotEmpty, IsString, Validate } from "class-validator";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'El email es obligatorio.' })
    email: string;
    
    @IsString()
    @IsNotEmpty({ message: 'El password es obligatorio.' })
    password: string;
}
