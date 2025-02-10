import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
    DeepPartial,
    FindOptionsOrder,
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
    ObjectLiteral,
    Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class BaseService<T extends ObjectLiteral> {
    protected readonly logger = new Logger(BaseService.name);
    constructor(private readonly baseRepository: Repository<T>) {}

    findAll(
        where?: FindOptionsWhere<T>,
        order?: FindOptionsOrder<T>,
        relations?: FindOptionsRelations<T> | FindOptionsRelations<T>,
        select?: FindOptionsSelect<T>,
        take?: number,
    ): Promise<T[]> {
        return this.baseRepository.find({ where, order, relations, select, take });
    }

    save(entity: DeepPartial<T>): Promise<T> {
        return this.baseRepository.save(entity);
    }

    findOne(where: FindOptionsWhere<T>, order?: FindOptionsOrder<T>): Promise<T | null> {
        return this.baseRepository.findOne({ where, order });
    }

    async update(
        where: FindOptionsWhere<T>,
        partialEntity: QueryDeepPartialEntity<T>,
    ): Promise<T | null> {
        const result = await this.baseRepository.update(where, partialEntity);
        if (!result.affected) {
            throw new NotFoundException('Entity not found.');
        }
        return await this.findOne(where);
    }
}
