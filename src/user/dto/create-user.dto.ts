import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/types/enums';

export class CreateUserDto {
    @ApiProperty({ example: 'user@user.com' })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'user' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: Role.USER, enum: Role })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}
