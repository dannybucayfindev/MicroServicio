import { Module } from '@nestjs/common';
import { DatabaseModule } from './common';
import { SubModule } from './module/module';

@Module({
  imports: [
    DatabaseModule,
    SubModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
