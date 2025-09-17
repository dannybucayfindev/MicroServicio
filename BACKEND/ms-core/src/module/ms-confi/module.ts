import { Module } from '@nestjs/common';
import { ManagementModule } from './management/module';


const modules = [
    ManagementModule,
];

@Module({
    imports: modules,
    exports: modules
})
export class MsConfigModule { }
