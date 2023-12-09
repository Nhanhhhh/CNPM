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

    @Post()
    createOrder(@Body() body: any): Promise<Order> {
        var order_detail: Order_detail[] = body.order_details;

        var total = 0;
        order_detail.forEach((i) => {
            total += (i.price * i.quantity);
            this.ordersDetailService.createOrderDetail(i);
        })
        var finalMoney = total * body.discount / 100;
        var deliveryPrice = 25000;
        if(finalMoney >= 100000) deliveryPrice = 0;
        //finalMoney += deliveryPrice;

        var delivery: any = {
            method: "Giao hàng nhanh",
            price: deliveryPrice,
        }

        var payment: any = {
            name: "Thanh toán khi nhận hàng",
            status: "Chưa thanh toán",
        }

        var newOrder: any = {
            total: finalMoney,
            note: body.note,
            discount: body.discount,
            user: body.user,
            order_detail: order_detail,
            delivery: delivery,
            payment: payment,
        }   

        console.log(newOrder);
        this.PaymentsService.createPayment(payment);
        this.DeliveryService.createDelivery(delivery);
        return this.OrdersService.createOrder(newOrder);
    }

    @Get()
    getAll(): Promise<Order[]> {
        return this.OrdersService.findAll();
    }

    @Get(':id') 
    getOrderById(@Param() params) {
        return this.OrdersService.getOrderById(params.id);
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