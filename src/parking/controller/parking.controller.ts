import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateParkingDto } from '../dto/create-parking.dto';
import { UpdateParkingDto } from '../dto/update-parking.dto';
import { ParkingService } from '../services/parking.service';
import { ParkingValidations } from '../services/validations/ParkingValidations';
import { Roles } from 'src/auth/role.decoratior'; // Asegúrate de que esta ruta sea correcta
import { UserRole } from 'src/users/service/user.role';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Parking } from '../entities/parking.entity';

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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(): Promise<Parking[]> {
    return this.parkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Parking> {
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
