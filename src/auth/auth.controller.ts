import { Body, Controller, Post } from '@nestjs/common';
import { ROUTES } from 'src/config/constants';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { IToken } from 'src/types/interfaces';

@ApiTags(ROUTES.AUTH)
@Controller(ROUTES.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({
        summary: 'Login',
        description: 'Logs user in the system and returns access token',
    })
    @ApiOkResponse({
        type: String,
    })
    @ApiBody({
        type: LoginDto,
    })
    login(@Body() loginDto: LoginDto): Promise<IToken> {
        return this.authService.login(loginDto);
    }

    @ApiOperation({
        summary: 'Register',
        description: 'Registers user in the system and returns access token',
    })
    @ApiOkResponse({
        type: String,
    })
    @ApiBody({
        type: RegisterDto,
    })
    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<IToken | Error> {
        return this.authService.register(registerDto);
    }
}
