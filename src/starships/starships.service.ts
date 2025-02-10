import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { ROUTES } from 'src/config/constants';
import { IStarship } from 'src/types/interfaces';
import { IQueryParams } from 'src/types/types';

@Injectable()
export class StarshipsService extends DataService<IStarship> {
    constructor() {
        super();
    }

    findAll(query?: IQueryParams<IStarship>) {
        return super.getAll(ROUTES.STARSHIPS, query);
    }

    findOne(id: string) {
        return super.getOne(ROUTES.STARSHIPS, id);
    }
}
