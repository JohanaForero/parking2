import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateParkingDto } from '../dto/create-parking.dto';
import { UpdateParkingDto } from '../dto/update-parking.dto';
import { ParkingService } from '../services/parking.service';
import { ParkingValidations } from '../services/validations/ParkingValidations';
import { Roles } from 'src/auth/role.decoratior'; // Asegúrate de que esta ruta sea correcta
import { UserRole } from 'src/users/service/user.role';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('api')
export class ParkingController {
  constructor(private parkingService: ParkingService,
    private readonly parkingValidationService: ParkingValidations
  ) {}

  @Post('/parking')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createParkingDto: CreateParkingDto) {
  
    console.log(createParkingDto);
    return await this.parkingService.create(createParkingDto);
  }

  @Get()
  findAll() {
    return this.parkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.parkingService.delete(id);
  }
}
