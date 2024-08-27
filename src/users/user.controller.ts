import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./service/users.service";

@Controller('api')
export class UserController {
  constructor(private usersService: UsersService
  ) {}

  @Post('/user')
  async create(@Body() createUserDto: CreateUserDto) {
  
    console.log(createUserDto);
    return await this.usersService.create(createUserDto);
  }
}