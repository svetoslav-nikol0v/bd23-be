import { Controller, Get, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IVehicle, IResult } from 'src/types/interfaces';
import { ROUTES } from 'src/config/constants';
import { VehiclesService } from './vehicles.service';
import { IQueryParams } from 'src/types/types';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@UseInterceptors(CacheInterceptor)
@ApiTags(ROUTES.VEHICLES)
@Controller(ROUTES.VEHICLES)
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService) {}

    @Get()
    @ApiOperation({
        summary: 'Retrieve all vehicles',
        description: 'Returns a list of all vehicles',
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
    fetchAll(@Query() query?: IQueryParams<IVehicle>): Promise<IResult<IVehicle>> {
        return this.vehiclesService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Retrieve a vehicle by id',
        description: 'Returns a vehicle',
    })
    @ApiParam({ name: 'id', type: String, description: 'Vehicle id' })
    fetchOne(@Param('id') id: string): Promise<IVehicle> {
        return this.vehiclesService.findOne(id);
    }
}
