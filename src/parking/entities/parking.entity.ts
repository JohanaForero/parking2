import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('parking')
export class ParkingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'partner_id' })
  partnerId: string;

  @Column({ name: 'name' })
  parkingName: string;

  @Column({ name: 'cost_per_hour', type: 'int' })
  costPerHour: number;

  @Column({ name: 'number_of_parking_lots', type: 'int' })
  numberOfParkingLots: number;
}
