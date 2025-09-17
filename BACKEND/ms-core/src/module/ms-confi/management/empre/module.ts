import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/common';
import { AuthTransportConfig } from 'src/common/transports/auth.module';
import { EmpreController } from './controller';
import { EmpreEnum } from './enum/enum';

@Module({
    imports: [
        ClientsModule.register([
            AuthTransportConfig,
            {
                name: EmpreEnum.msService,
                transport: Transport.NATS,
                options: {
                    servers: envs.ms.natsServer
                }
            },
        ]),
    ],
    controllers: [EmpreController],

})
export class EmpreModule { }
