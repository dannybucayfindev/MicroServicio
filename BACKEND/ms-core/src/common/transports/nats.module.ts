import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/common/config/environment/env.config';
import { EmpreEnum } from 'src/module/ms-confi/management/empre/enum/enum';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: EmpreEnum.msService,
                transport: Transport.NATS,
                options: {
                    servers: envs.ms.natsServer
                }
            },
        ]),
    ],
    providers: [],
})
export class TidenModule { }