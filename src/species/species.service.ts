import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { ROUTES } from 'src/config/constants';
import { ISpecies } from 'src/types/interfaces';
import { IQueryParams } from 'src/types/types';

@Injectable()
export class SpeciesService extends DataService<ISpecies> {
    constructor() {
        super();
    }

    findAll(query?: IQueryParams<ISpecies>) {
        return super.getAll(ROUTES.SPECIES, query);
    }

    findOne(id: string) {
        return super.getOne(ROUTES.SPECIES, id);
    }
}
