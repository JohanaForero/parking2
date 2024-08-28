import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Parking } from './parking.entity'; // Asegúrate de que la ruta sea correcta

@Entity('parking_lot')
export class ParkingLot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'entrance_date', type: 'timestamp' })
  entranceDate: Date;

  @ManyToOne(() => Parking, (parking) => parking.parkingLots)
  @JoinColumn({ name: 'parking_id' })
  parking: Parking;

  @Column({ name: 'code' })
  code: number;
}