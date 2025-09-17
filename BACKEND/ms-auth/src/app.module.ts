import { Module } from '@nestjs/common';
import { DatabaseModule, envs } from './common';
import { AuthModule } from './module/interface/module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: envs.jwt.secret,
      signOptions: { expiresIn: envs.jwt.expiresIn },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
