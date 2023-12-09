import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { Order_detail } from './order_detail.entity';

@Controller('order-details')
export class OrderDetailsController {
    constructor(private Order_detailService: OrderDetailsService){}

    @Get()
    getAll(): Promise<Order_detail[]> {
        return this.Order_detailService.findAll();
    }

    @Get(':id') 
    getOrderDetailById(@Param() params) {
        return this.Order_detailService.getOrderDetailById(params.id);
    }

    @Put()
    updateOrderDetail(@Body() order_detail: Order_detail) {
        return this.Order_detailService.updateOrderDetail(order_detail);
    }

    @Delete(':id')
    deleteOrderDetail(@Param() params) {
        return this.Order_detailService.deleteOrderDetail(params.id);
    }

    @Post()
    createOrderDetail(@Body() order_detail: Order_detail): Promise<Order_detail> {
        return this.Order_detailService.createOrderDetail(order_detail);
    }
}
