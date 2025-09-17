import { Module } from '@nestjs/common';
import { AuthModule } from './module/ms-auth/module';
import { MsConfigModule } from './module/ms-confi/module';
@Module({
  imports: [
    AuthModule,
    MsConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
