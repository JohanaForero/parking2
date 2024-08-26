import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Parking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'partner_id', nullable: false })
  partnerId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ name: 'cost_per_hour', type: 'int', nullable: false })
  costPerHour: number;

  @Column({ name: 'number_of_parking_lots', type: 'int', nullable: false })
  numberOfParkingLots: number;
}
