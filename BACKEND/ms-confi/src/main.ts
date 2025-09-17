import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { envs } from './common/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllExceptionsFilter } from './shared/util/response/all.response';
import { GeneralConstant } from './common/config/constant';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (envs.nodeEnv === 'development') {
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    await app.listen(envs.port);
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: envs.ms.natsServer,
      timeout: 5000,
      retryAttempts: 3,
      retryDelay: 1000,
    },
  }, { inheritAppConfig: true });

  await app.startAllMicroservices();
  console.log(`Microservicio ${GeneralConstant.appAbr}[${envs.nodeEnv}]: iniciado en puerto ${envs.port}`, 'Bootstrap');
}
bootstrap();