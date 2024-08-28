import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async createAdmin(userData: Partial<User>): Promise<User> {  
        userData.role = UserRole.ADMIN;
        const user = this.userRepo.create(userData);
        return this.userRepo.save(user);
      }

    async findByEmail(email: string): Promise<User> {
        console.log(email);
        const user = await this.userRepo.createQueryBuilder('user')
          .where('user.email = :email', { email })
          .getOne();

        if(!user) {
          throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }
        return user;
      }
}
  