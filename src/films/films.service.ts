import { Injectable } from '@nestjs/common';
import { ROUTES } from 'src/config/constants';
import { DataService } from 'src/data/data.service';
import { IFilm } from 'src/types/interfaces';
import { IQueryParams } from 'src/types/types';

@Injectable()
export class FilmsService extends DataService<IFilm> {
    constructor() {
        super();
    }

    findAll(query?: IQueryParams<IFilm>) {
        return super.getAll(ROUTES.FILMS, query);
    }

    findOne(id: string) {
        return super.getOne(ROUTES.FILMS, id);
    }
}
