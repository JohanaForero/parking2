import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './user.role';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    ){}

    async create(userData: Partial<User>): Promise<User> {  
        userData.role = UserRole.PARTNER;
        const user = this.userRepo.create(userData);
        return this.userRepo.save(user);
      }

    async findByName(email: string): Promise<User | null> {
        console.log(email);
        return this.userRepo.createQueryBuilder('user')
          .where('user.email = :email', { email: email })
          .getOne();
      }
}
  