import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import { SignInDto } from './dto/signIn.dto';
import { hash, compare } from 'bcryptjs';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserRole } from 'src/users/service/user.role';
import { User } from 'src/users/entity/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerEmployee(createEmployeeDto: CreatePartnerDto) {
    let user = plainToClass(CreateUserDto, createEmployeeDto);
    const passencript = await hash(user.password, 10);
    user = { ...user, password: passencript };
    return this.userService.create(user);
  }

  async registerAdmin(createEmployeeDto: CreatePartnerDto) {
    let user = plainToClass(User, createEmployeeDto);
    const passencript = await hash(user.password, 10);
    user = { ...user, password: passencript };
    return this.userService.createAdmin(user);
  }
  
  
  async login(sigInDto: SignInDto) {
    const { email, password } = sigInDto;
    const userExisting = await this.userService.findByEmail(email);
    if (!userExisting) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
    
    console.log(userExisting);
    const checkPass = await compare(password, userExisting.password);

    if (!checkPass)
      throw new HttpException('Pasword Incorrect', HttpStatus.FORBIDDEN);
    console.log(checkPass);
    const payload = {
      id: userExisting.id,
      userEmail: userExisting.email,
      role: userExisting.role,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }


  
  logout() {
    return 'This action adds a new auth';
  }
}
