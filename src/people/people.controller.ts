import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ROUTES } from 'src/config/constants';
import { IPerson, IResult } from 'src/types/interfaces';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IQueryParams } from 'src/types/types';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(ThrottlerGuard, AuthGuard)
@UseInterceptors(CacheInterceptor)
@ApiTags(ROUTES.PEOPLE)
@Controller(ROUTES.PEOPLE)
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all people',
        description: 'Returns a list of all people',
    })
    @ApiQuery({
        name: 'sort',
        description: 'Indicates the filed by which the list should be sorted',
        required: false,
    })
    @ApiQuery({
        name: 'order',
        description: 'Indicates how the list should be sorted (ASC or DESC, by default is ASC)',
        required: false,
    })
    @ApiQuery({
        name: 'page',
        description: 'Indicates the number of page',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        description: 'Indicates total number of items on the page',
        required: false,
    })
    fetchAll(@Query() query?: IQueryParams<IPerson>): Promise<IResult<IPerson>> {
        return this.peopleService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a person by id',
        description: 'Returns a person',
    })
    @ApiParam({ name: 'id', type: String, description: 'Person id' })
    fetchOne(@Param('id') id: string): Promise<IPerson> {
        return this.peopleService.findOne(id);
    }
}
