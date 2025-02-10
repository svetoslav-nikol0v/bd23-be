import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ROUTES } from 'src/config/constants';
import { IResult, IStarship } from 'src/types/interfaces';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StarshipsService } from './starships.service';
import { IQueryParams } from 'src/types/types';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(ThrottlerGuard, AuthGuard)
@UseInterceptors(CacheInterceptor)
@ApiTags(ROUTES.STARSHIPS)
@Controller(ROUTES.STARSHIPS)
export class StarshipsController {
    constructor(private readonly starshipsService: StarshipsService) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all starships',
        description: 'Returns a list of all starships',
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
    fetchAll(@Query() query?: IQueryParams<IStarship>): Promise<IResult<IStarship>> {
        return this.starshipsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a starship by id',
        description: 'Returns a starship',
    })
    @ApiParam({ name: 'id', type: String, description: 'Starship id' })
    fetchOne(@Param('id') id: string): Promise<IStarship> {
        return this.starshipsService.findOne(id);
    }
}
