import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { ROUTES } from 'src/config/constants';
import { IPlanet } from 'src/types/interfaces';
import { IQueryParams } from 'src/types/types';

@Injectable()
export class PlanetsService extends DataService<IPlanet> {
    constructor() {
        super();
    }

    findAll(query?: IQueryParams<IPlanet>) {
        return super.getAll(ROUTES.PLANETS, query);
    }

    findOne(id: string) {
        return super.getOne(ROUTES.PLANETS, id);
    }
}
