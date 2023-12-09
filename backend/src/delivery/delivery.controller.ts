import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { Delivery } from './delivery.entity';

@Controller('delivery')
export class DeliveryController {
    constructor(private DeliveryService: DeliveryService){}

    @Get()
    getAll(): Promise<Delivery[]> {
        return this.DeliveryService.findAll();
    }

    @Get(':id') 
    getDeliveryById(@Param() params) {
        return this.DeliveryService.getDeliveryById(params.id);
    }

    @Put()
    updateDelivery(@Body() delivery: Delivery) {
        return this.DeliveryService.updateDelivery(delivery);
    }

    @Delete(':id')
    deleteDelivery(@Param() params) {
        return this.DeliveryService.deleteDelivery(params.id);
    }

    @Post()
    createDelivery(@Body() delivery: Delivery): Promise<Delivery> {
        return this.DeliveryService.createDelivery(delivery);
    }
}
