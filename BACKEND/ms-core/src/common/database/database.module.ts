import { Module, Global } from '@nestjs/common';
import { PgService } from './pg.config';

@Global()
@Module({
  providers: [PgService],
  exports: [PgService],
})
export class DatabaseModule {}
