import { IBaseQueryParams } from './interfaces';

export type IQueryParams<T> = Partial<T> & IBaseQueryParams;
