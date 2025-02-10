import { IsNotEmpty, IsString } from 'class-validator';
import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends LoginDto {
    @ApiProperty({ example: 'user' })
    @IsNotEmpty()
    @IsString()
    confirmedPassword: string;
}
