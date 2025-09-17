import { Controller, Get, Post, Body, Param, Delete, Put, Inject, UseGuards, ParseIntPipe } from '@nestjs/common';
import { EmpreEnum } from './enum/enum';
import { EmpreDto } from './dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from 'src/module/ms-auth/guards/auth.guard';;
import { firstValueFrom } from 'rxjs';

@Controller(EmpreEnum.table)
export class EmpreController {

    constructor(
        @Inject(EmpreEnum.msService) private readonly service: ClientProxy,
    ) { }

    @Get('/')
    @UseGuards(AuthGuard)
    public async findAll() {
        const startTime = Date.now();
        try {
            const result = await firstValueFrom(this.service.send({ sm: EmpreEnum.smFindAll }, {}));
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    public async findById(@Param('id', ParseIntPipe) id: number) {
        try {
            return await firstValueFrom(this.service.send({ sm: EmpreEnum.smFindById }, { id }));
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    public async create(@Body() data: EmpreDto) {
        try {
            const result = await firstValueFrom(this.service.send({ sm: EmpreEnum.smCreate }, data));
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }
    @Put(':id')
    @UseGuards(AuthGuard)
    public async update(@Param('id', ParseIntPipe) id: number, @Body() data: EmpreDto) {
        try {
            const result = await firstValueFrom(this.service.send({ sm: EmpreEnum.smUpdate }, { id, data }));
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    public async delete(@Param('id', ParseIntPipe) id: number) {
        try {
            const result = await firstValueFrom(this.service.send({ sm: EmpreEnum.smDelete }, { id }));
            return result;
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
