
import { Module } from '@nestjs/common';
import { EmpreModule } from './empre/module';

const submodule = [
  EmpreModule,

];

@Module({
  imports: submodule,
  exports: submodule,
})
export class ManagementModule { }
