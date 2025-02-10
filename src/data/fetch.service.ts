import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BASE_API_URL } from 'src/config/constants';
import { IRawResult } from 'src/types/interfaces';

@Injectable()
export abstract class FetchService<T> {
    protected logger = new Logger(FetchService.name);
    private cacheData: IRawResult<T> = null;

    private async fetch<R>(url: string): Promise<R> {
        try {
            const response = await fetch(url);
            this.logger.log(`Fetched data from ${url}.`);
            return await response.json();
        } catch (error) {
            this.logger.log(`Error fetching data from ${url}, ${error}`);
            throw new BadRequestException(`Error fetching data from ${url}:`, error);
        }
    }

    private async enrichEntity(entity: T): Promise<T> {
        const enriched = { ...entity };
        const relatedFields = Object.keys(enriched);

        for (const field of relatedFields) {
            if (entity.hasOwnProperty(field)) {
                if (Array.isArray(entity[field])) {
                    // Handle arrays of URLs
                    enriched[field] = await Promise.all(entity[field].map(url => this.fetch(url)));
                } else if (
                    // Remove enrichment of the object with itself
                    field !== 'url' &&
                    typeof entity[field] === 'string' &&
                    entity[field].startsWith('http')
                ) {
                    // Handle single URL fields
                    enriched[field] = await this.fetch(entity[field]);
                }
            }
        }

        return enriched;
    }

    async fetchAll(route: string): Promise<IRawResult<T>> {
        const url = `${BASE_API_URL}${route}`;

        let data = await this.fetch<IRawResult<T>>(url);

        if (!this.cacheData) {
            while (data.next) {
                const newData = await this.fetch<IRawResult<T>>(data.next);
                data = {
                    ...data,
                    next: newData.next,
                    results: [...data.results, ...newData.results],
                };

                // Cache large lists to avoid additional requests
                this.cacheData = { ...data };
            }

            return data;
        }

        return this.cacheData;
    }

    async fetchOne(route: string, id: string): Promise<T> {
        const url = `${BASE_API_URL}${route}/${id}`;
        const data = await this.fetch<T>(url);
        return this.enrichEntity(data);
    }
}
