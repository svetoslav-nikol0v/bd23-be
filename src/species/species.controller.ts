import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ROUTES } from 'src/config/constants';
import { IResult, ISpecies } from 'src/types/interfaces';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { IQueryParams } from 'src/types/types';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(ThrottlerGuard, AuthGuard)
@UseInterceptors(CacheInterceptor)
@ApiTags(ROUTES.SPECIES)
@Controller(ROUTES.SPECIES)
export class SpeciesController {
    constructor(private readonly speciesService: SpeciesService) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all species',
        description: 'Returns a list of all species',
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
    fetchAll(@Query() query?: IQueryParams<ISpecies>): Promise<IResult<ISpecies>> {
        return this.speciesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a species by id',
        description: 'Returns a species',
    })
    @ApiParam({ name: 'id', type: String, description: 'Species id' })
    fetchOne(@Param('id') id: string): Promise<ISpecies> {
        return this.speciesService.findOne(id);
    }
}
