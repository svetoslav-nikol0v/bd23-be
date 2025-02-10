import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { ROUTES } from 'src/config/constants';
import { IVehicle } from 'src/types/interfaces';
import { IQueryParams } from 'src/types/types';

@Injectable()
export class VehiclesService extends DataService<IVehicle> {
    constructor() {
        super();
    }

    findAll(query?: IQueryParams<IVehicle>) {
        return super.getAll(ROUTES.VEHICLES, query);
    }

    findOne(id: string) {
        return super.getOne(ROUTES.VEHICLES, id);
    }
}
