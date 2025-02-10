import { FilmsService } from './films.service';
import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ROUTES } from 'src/config/constants';
import { IFilm, IResult } from 'src/types/interfaces';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IQueryParams } from 'src/types/types';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(ThrottlerGuard, AuthGuard)
@UseInterceptors(CacheInterceptor)
@ApiTags(ROUTES.FILMS)
@Controller(ROUTES.FILMS)
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all films',
        description: 'Returns a list of all films',
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
    fetchAll(@Query() query?: IQueryParams<IFilm>): Promise<IResult<IFilm>> {
        return this.filmsService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a film by id',
        description: 'Returns a film',
    })
    @ApiParam({ name: 'id', type: String, description: 'Film id' })
    fetchOne(@Param('id') id: string): Promise<IFilm> {
        return this.filmsService.findOne(id);
    }
}
