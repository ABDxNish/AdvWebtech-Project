import { Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { UpdatePhoneDto } from './Dto/update-phone.dto';
import { CreateUserCategory2Dto } from './Dto/CreateUserCategory2Dto';
import { UserCategory2 } from './Entity/UserCategoryEntity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Lab3Service {
  constructor(
    @InjectRepository(UserCategory2)
    private readonly userRepo: Repository<UserCategory2>,
  ) {}
  async create(dto: CreateUserCategory2Dto) {
    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  async updatePhone(id: string, dto: UpdatePhoneDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    user.phone = dto.phone;
    return await this.userRepo.save(user);
  }

  async findNullFullNames() {
    return await this.userRepo.find({
      where: {
        fullName: IsNull(),
      },
    });
  }

  async remove(id: string) {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return { message: 'User deleted' };
  }
}
