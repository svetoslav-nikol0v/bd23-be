import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_PATH } from './constants';
import { INestApplication } from '@nestjs/common';
import { ROUTES } from './constants';

const TITLE = 'BD23';
const DESCRIPTION = 'REST API';
const VERSION = '1.0.0';

export const initSwagger = (app: INestApplication): void => {
    const config = new DocumentBuilder()
        .setTitle(TITLE)
        .setDescription(DESCRIPTION)
        .setVersion(VERSION)
        .addTag(ROUTES.AUTH)
        .addTag(ROUTES.USERS)
        .addTag(ROUTES.PEOPLE)
        .addTag(ROUTES.FILMS)
        .addTag(ROUTES.STARSHIPS)
        .addTag(ROUTES.PLANETS)
        .addTag(ROUTES.SPECIES)
        .addTag(ROUTES.VEHICLES)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SWAGGER_PATH, app, document);
};
