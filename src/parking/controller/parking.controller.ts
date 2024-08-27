import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateParkingDto } from '../dto/create-parking.dto';
import { UpdateParkingDto } from '../dto/update-parking.dto';
import { ParkingService } from '../services/parking.service';
import { ParkingValidations } from '../services/validations/ParkingValidations';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ParkingAlreadyExistsException } from '../exception/ParkingAlreadyExistsException';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guardia';
import { Role } from 'src/auth/role.enum';

@Controller('api')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParkingController {
  constructor(private parkingService: ParkingService,
    private readonly parkingValidationService: ParkingValidations
  ) {}

  @Roles(Role.Admin)
  @Post('/parking')
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
  @Roles(Role.Admin)
  delete(@Param('id') id: number) {
    return this.parkingService.delete(id);
  }
}
