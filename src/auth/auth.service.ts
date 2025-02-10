import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { IToken } from 'src/types/interfaces';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto): Promise<IToken> {
        const { email, password } = loginDto;
        const user = await this.userService.findOne({ email });

        if (user?.password !== password) {
            throw new UnauthorizedException();
        }

        const token = await this.generateToken(user);

        this.logger.log(`User with email ${email} has been logged.`);

        return { token };
    }

    async register(registerDto: RegisterDto): Promise<IToken | Error> {
        const { email, password, confirmedPassword } = registerDto;

        const existingUser = await this.userService.findOne({ email });

        if (existingUser) {
            throw new BadRequestException('User already exists.');
        }

        if (password !== confirmedPassword) {
            throw new BadRequestException('Passwords do not match.');
        }

        const newUser = await this.userService.save({
            email,
            password,
        });

        try {
            const token = await this.generateToken(newUser);

            this.logger.log(`User with email ${email} has been registered.`);
            return { token };
        } catch (error) {
            throw error;
        }
    }

    private generateToken(payload: User): Promise<string> {
        return this.jwtService.signAsync({ ...payload });
    }
}
