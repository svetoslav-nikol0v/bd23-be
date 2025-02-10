import { Injectable } from '@nestjs/common';
import {
    SORT_QUERY_PARAMETERS,
    PAGINATE_QUERY_PARAMETERS,
    DEFAULT_PAGINATE_QUERY_PARAMS,
} from 'src/config/constants';
import { Order } from 'src/types/enums';
import { IBaseQueryParams, IResult } from 'src/types/interfaces';
import { IQueryParams } from 'src/types/types';
import { extractCommonItems, removeCommonItems } from 'src/utils/arrays';
import { extractFromObject } from 'src/utils/objects';
import { FetchService } from './fetch.service';

@Injectable()
export abstract class DataService<T> extends FetchService<T> {
    constructor() {
        super();
    }

    private filter(raw: T[], filterParams?: IQueryParams<T>): T[] {
        return raw.filter((item: T) =>
            Object.keys(filterParams).every((key: string) => item[key] === filterParams[key]),
        );
    }

    private sort(raw: T[], orderParams?: IBaseQueryParams): T[] {
        const isAscending = (orderParams.order ?? Order.ASC) === Order.ASC;
        const sortBy = orderParams.sort;

        return raw.sort((a: T, b: T) => {
            if (a[sortBy] === undefined || b[sortBy] === undefined) {
                throw new Error(
                    `Property '${sortBy}' does not exist on some objects in the array.`,
                );
            }

            if (a[sortBy] > b[sortBy]) {
                return isAscending ? 1 : -1;
            } else if (a[sortBy] < b[sortBy]) {
                return isAscending ? -1 : 1;
            }
            return 0;
        });
    }

    private paginate(array: T[], paginateParams?: IBaseQueryParams): IResult<T> {
        const { page: p, limit: l } = paginateParams;
        const page = +p;
        const limit = +l;
        // Calculate the starting index
        const startIndex = (page - 1) * limit;
        // Slice the array to get the items for the current page
        const results = array.slice(startIndex, startIndex + limit);

        // Calculate total number of items
        const total = array.length;
        // Calculate total number of pages
        const totalPages = Math.ceil(total / limit);

        return {
            totalPages,
            results,
        };
    }

    async getAll(route: string, query?: IQueryParams<T>): Promise<IResult<T>> {
        let paginateQueryParams = { ...DEFAULT_PAGINATE_QUERY_PARAMS };

        const data = await super.fetchAll(route);
        let results: T[] = [...data.results];

        const queryKeys = Object.keys(query ?? []);
        const sortQueryParamsKeys = extractCommonItems(queryKeys, SORT_QUERY_PARAMETERS);
        const paginateQueryParamsKey = extractCommonItems(queryKeys, PAGINATE_QUERY_PARAMETERS);
        const filterQueryParamsKeys = removeCommonItems(
            queryKeys,
            PAGINATE_QUERY_PARAMETERS.concat(SORT_QUERY_PARAMETERS),
        );

        // Filtering results
        // It takes precedence over sorting
        // because it removes irrelevant data first
        if (filterQueryParamsKeys.length) {
            const filterQueryParams = extractFromObject<T>(filterQueryParamsKeys, query);
            results = this.filter(results, filterQueryParams);
            this.logger.log(`Fetched data for ${route} route has been filtered.`);
        }

        // Sorting results
        if (sortQueryParamsKeys.length) {
            const sortQueryParams = extractFromObject<T>(sortQueryParamsKeys, query);
            results = this.sort(results, sortQueryParams);
            this.logger.log(`Fetched data for ${route} route has been sorted.`);
        }

        paginateQueryParams = {
            ...paginateQueryParams,
            ...extractFromObject<T>(paginateQueryParamsKey, query),
        };
        const result = this.paginate(results, paginateQueryParams);
        this.logger.log(`Fetched data for ${route} route has been paginated.`);

        return result;
    }

    getOne(route: string, id: string): Promise<T> {
        return super.fetchOne(route, id);
    }
}
