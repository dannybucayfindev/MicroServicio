import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs, RpcCustomExceptionFilter } from './common';
import { GeneralConstant } from './constant';
import { AllExceptionsFilter } from './shared/util/response/all.response';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    envs.cors,
    'http://localhost:4200', 
    'http://127.0.0.1:4200', 
  ];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.port);
  console.log(`${GeneralConstant.appAbr}: en el puerto ${envs.port}`, 'Bootstrap');

}

bootstrap();
