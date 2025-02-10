import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL_PREFIX, SERVER_PORT } from './config/constants';
import { initSwagger } from './config/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.enableCors({
        origin: (origin, callback) => {
            callback(null, origin); // Allow all origins
        },
        credentials: true,
    });
    initSwagger(app);

    try {
        await app.listen(SERVER_PORT);
        console.log(`Server started successfully on port: ${SERVER_PORT}`);
    } catch (error) {
        console.log(`An error occurred starting the server on port: ${SERVER_PORT}`, error);
    }
}
bootstrap();
