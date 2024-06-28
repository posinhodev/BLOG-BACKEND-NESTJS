import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: createUserDto.username
      }
    })

    if (userFound) {
      return new HttpException("User alredy exist", HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['posts', 'profile']
    });
  }

  async findOne(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
      relations: ['posts']
    });

    if (!userFound) {
      return new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: { id }
    });

    if (!userFound) {
      return new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const updatedUser = Object.assign(userFound, updateUserDto);

    return this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
