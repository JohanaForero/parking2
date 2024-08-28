import { IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "src/users/service/user.role";

export class CreateAdminDto {
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