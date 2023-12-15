import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order_detail } from 'src/order_details/order_detail.entity';
import { Order } from './order.entity';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { PaymentsService } from 'src/payments/payments.service';
import { DeliveryService } from 'src/delivery/delivery.service';


@Controller('orders')
export class OrdersController {
    constructor(
        private OrdersService: OrdersService,
        private ordersDetailService: OrderDetailsService,
        private DeliveryService: DeliveryService,
        private PaymentsService: PaymentsService
        ) {}

    @Post('createNewOrder')
    async createOrder(@Body() body: any): Promise<Order> {
       

        var delivery: any = {
            method: "Giao hàng nhanh",
            price: deliveryPrice,
            address: body.address,
        }

        // console.log(newOrder);
        let createPayment = await this.PaymentsService.createPayment(body.payment);
        let createDelivery = await this.DeliveryService.createDelivery(delivery);
        
        var newOrder: any = {
            total: finalMoney,
            note: body.note,
            discount: body.discount,
            user: body.user,
            order_detail: order_detail,
            delivery: createDelivery,
            payment: createPayment,
            progress: 0,
        }   
        let thisOrder = await this.OrdersService.createOrder(newOrder);
        var order_detail: Order_detail[] = body.order_details;
        
        var total = 0;
        order_detail.forEach((i) => {
            i.order = thisOrder;
            total += (i.price * i.quantity);
            this.ordersDetailService.createOrderDetail(i);
        })
        var finalMoney = total * (1 - body.discount);
        var deliveryPrice = 25000;
        if(finalMoney >= 100000) deliveryPrice = 0;
        finalMoney += deliveryPrice;
        
        thisOrder.total = finalMoney;
        await this.OrdersService.updateOrder(thisOrder);        
        newOrder.total = finalMoney;
        
        console.log(newOrder);
        return newOrder;
    }
    
    @Get()
    getAll(): Promise<Order[]> {
        return this.OrdersService.findAll();
    }

    @Get('getById/:id')
    getOrderById(@Param() params) {
        return this.OrdersService.getOrderById(params.id);
    }

    @Get('ref/:id') 
    getRef(@Param() params): Promise<any> {
        return this.OrdersService.getRef(params.id);
    }

    @Put()
    updateOrder(@Body() order: Order) {
        return this.OrdersService.updateOrder(order);
    }

    @Delete(':id')
    deleteOrder(@Param() params) {
        return this.OrdersService.deleteOrder(params.id);
    }
}
