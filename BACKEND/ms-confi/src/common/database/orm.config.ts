import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from '../config';

const modules = [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: envs.db.host,
        port: envs.db.port,
        username: envs.db.username,
        password: envs.db.password,
        database: envs.db.name,
        synchronize: true,
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        ssl: envs.db.ssl,
        logging: envs.nodeEnv === 'development' ? ['query', 'error'] : ['error'],
        migrations: [],
        migrationsRun: false,
        cache: {
            duration: 30000, // 30 segundos
        },
    }),
]

@Module({
    imports: modules,
    exports: modules,
})
export class OrmDatabaseModule { }
