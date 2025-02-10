import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ROUTES } from 'src/config/constants';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RolesDecorator } from 'src/decorators/role.decorator';
import { Role } from 'src/types/enums';

@UseGuards(AuthGuard)
@ApiTags(ROUTES.USERS)
@Controller(ROUTES.USERS)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(RoleGuard)
    @RolesDecorator(Role.ADMIN)
    @ApiOperation({
        summary: 'Retrieve all user',
        description: 'Returns a list of all user',
    })
    @ApiOkResponse({
        type: [User],
    })
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a user by id',
        description: 'Returns a user',
    })
    @ApiOkResponse({
        type: User,
    })
    @ApiParam({ name: 'id', type: String })
    findOne(@Param('id') id: string) {
        return this.userService.findOne({ id });
    }
}
