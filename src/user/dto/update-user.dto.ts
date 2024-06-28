import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @Transform(({ value }) => value.toLowerCase().replace(/\s+/g, ''))
    username?: string;

    @IsString()
    password?: string;
}
