import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsString()
    @IsNotEmpty({ message: 'El email es obligatorio.' })
    email: string;
    
    @IsString()
    @IsNotEmpty({ message: 'El password es obligatorio.' })
    password: string;
}
