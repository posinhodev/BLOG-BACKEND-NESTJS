import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService
  ) {}

  async create(createPostDto: CreatePostDto) {

    const userFound = await this.userService.findOne(createPostDto.authorId);

    if (!userFound) {
      return new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const newPost = this.postRepository.create(createPostDto);
    
    return this.postRepository.save(newPost);
  }

  findAll() {
    return this.postRepository.find({
      relations: ['author']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
