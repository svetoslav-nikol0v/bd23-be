import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { ROUTES } from 'src/config/constants';
import { IPerson } from 'src/types/interfaces';
import { IQueryParams } from 'src/types/types';

@Injectable()
export class PeopleService extends DataService<IPerson> {
    constructor() {
        super();
    }

    findAll(query?: IQueryParams<IPerson>) {
        return super.getAll(ROUTES.PEOPLE, query);
    }

    findOne(id: string) {
        return super.getOne(ROUTES.PEOPLE, id);
    }
}
