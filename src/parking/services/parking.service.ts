import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Parking } from '../entities/parking.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(Parking)
    private readonly parkingRepo: Repository<Parking>,
  ) {}

  findAll() {
    return this.parkingRepo.find();
  }

  async findByName(parkingName: string): Promise<Parking | null> {
    return this.parkingRepo.createQueryBuilder('parking')
      .where('parking.parkingName = :name', { name: parkingName })
      .getOne();
  }

  findOne(id: number) {
    return this.parkingRepo.findOne({
      where: { id }
    });
  }

  async create(parkingData: Partial<Parking>): Promise<Parking> {
    const existingParking = await this.findByName(parkingData.parkingName);

    if (existingParking) {
      throw new ConflictException('El nombre del parking ya existe.');
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
