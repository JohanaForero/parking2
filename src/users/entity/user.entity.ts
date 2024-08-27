import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../service/user.role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PARTNER })
  role: UserRole;
}
