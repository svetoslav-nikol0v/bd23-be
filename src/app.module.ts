import { Module } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { PeopleModule } from './people/people.module';
import { FilmsModule } from './films/films.module';
import { StarshipsModule } from './starships/starships.module';
import { PlanetsModule } from './planets/planets.module';
import { SpeciesModule } from './species/species.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

dotenvConfig({ path: '.env' });

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            synchronize: true,
            ssl: true,
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60 * 1000, // A minute in ms
                limit: 50, // Max 10 request per minute
            },
        ]),
        CacheModule.register({ isGlobal: true }),
        AuthModule,
        UserModule,
        FilmsModule,
        PlanetsModule,
        StarshipsModule,
        PeopleModule,
        SpeciesModule,
        VehiclesModule,
    ],
})
export class AppModule {}
