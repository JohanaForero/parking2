import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards, NotFoundException, Put } from '@nestjs/common';
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
  async findOne(@Param('id') id: string): Promise<Parking> {
    try {
      const parking = await this.parkingService.findOne(+id);
      return parking;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`No se encontró ningún parqueadero con el ID ${id}`);
      }
      throw error;
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingService.update(+id, updateParkingDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ status: string}> {
    await this.parkingService.delete(id);
    return { status: 'OK'};
  }
}
