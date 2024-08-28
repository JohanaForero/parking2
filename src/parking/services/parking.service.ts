import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Parking } from '../entities/parking.entity';
import { ParkingAlreadyExistsException } from '../exception/ParkingAlreadyExistsException';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private readonly parkingRepo: Repository<Parking>,
  ) {}

  findAll(): Promise<Parking[]> {
    return this.parkingRepo.find();
  }

  async findByName(name: string): Promise<Parking | null> {
    console.log(name);
    return this.parkingRepo.createQueryBuilder('parking')
      .where('parking.name = :name', { name: name })
      .getOne();
  }

  findOne(id: number): Promise<Parking> {
    const parking =  this.parkingRepo.findOne({
      where: { id }
    });
    if(!parking) {
      throw new NotFoundException("No se encontro ningun parqueadero con ese id");
    }
    return parking;
  }

  async create(parkingData: Partial<Parking>): Promise<Parking> {
    const existingParking = await this.findByName(parkingData.name);
    console.log(existingParking);
    console.log(parkingData.name);
    if (existingParking) {
      throw new ParkingAlreadyExistsException();
    }
    const parking = this.parkingRepo.create(parkingData);
    return this.parkingRepo.save(parking);
  }

  async update(id: number, body: any) {
    const parking = await this.parkingRepo.findOne({
      where: { id }
    });
    this.parkingRepo.merge(parking, body);
    return this.parkingRepo.save(parking);
  }

  async delete(id: number) {
    await this.parkingRepo.delete(id);
    return true;
  }
}
