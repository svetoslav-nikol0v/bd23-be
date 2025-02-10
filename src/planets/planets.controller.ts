import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IPlanet, IResult } from 'src/types/interfaces';
import { ROUTES } from 'src/config/constants';
import { IQueryParams } from 'src/types/types';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(ThrottlerGuard, AuthGuard)
@UseInterceptors(CacheInterceptor)
@ApiTags(ROUTES.PLANETS)
@Controller(ROUTES.PLANETS)
export class PlanetsController {
    constructor(private readonly planetsService: PlanetsService) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all planets',
        description: 'Returns a list of all planets',
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
    fetchAll(@Query() query?: IQueryParams<IPlanet>): Promise<IResult<IPlanet>> {
        return this.planetsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a planet by id',
        description: 'Returns a planet',
    })
    @ApiParam({ name: 'id', type: String, description: 'Planet id' })
    fetchOne(@Param('id') id: string): Promise<IPlanet> {
        return this.planetsService.findOne(id);
    }
}
