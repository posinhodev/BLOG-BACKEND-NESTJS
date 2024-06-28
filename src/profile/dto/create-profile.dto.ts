import { Transform } from "class-transformer"
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsNumber()
    age?: number;
}
