import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Order_detail } from 'src/order_details/order_detail.entity';
import { User } from 'src/users/user.entity';
import { Delivery } from 'src/delivery/delivery.entity';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { OrderDetailsModule } from 'src/order_details/order_details.module';
import { OrderDetailsController } from 'src/order_details/order_details.controller';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly OrderRepo: Repository<Order>,
        private readonly orderDetailService: OrderDetailsService,
        private readonly deliveryService: DeliveryService,
        private readonly paymentService: PaymentsService,
    ) {}

    async createOrder(order: Order): Promise<Order> {
        return await this.OrderRepo.save(order);
    }

    async findAll(): Promise<Order[]> {
        // return await this.OrderRepo.find({relations: ['user', 'payment', 'delivery', 'order_detail']});
        return await this.OrderRepo
        .createQueryBuilder('order')
        .leftJoin('order.user', 'user')
    .addSelect(['user.id', 'user.name', 'user.phone'])
        .leftJoinAndSelect('order.payment', 'payment')
        .leftJoinAndSelect('order.delivery', 'delivery')
        .leftJoinAndSelect('order.order_detail', 'order_detail')
        .leftJoin('order_detail.product', 'product')
        .addSelect(['product.id', 'product.name'])
        .getMany();
        // .where('order_detail.orderId = :orderId', { orderId: 25 })
    }

    async updateOrder(order: Order): Promise<UpdateResult> {
        return await this.OrderRepo.update(order.id, order);
    }

    async getRef(id): Promise<any> {
        return await this.OrderRepo
        .createQueryBuilder('order')
        .select('order.id')
        .where('order.id = :orderId', {orderId: id})
        .leftJoin('order.payment', 'payment')
        .addSelect('payment.id')
        .leftJoin('order.delivery', 'delivery')
        .addSelect('delivery.id')
        .leftJoin('order.order_detail', 'order_detail')
        .addSelect('order_detail.id')
        .getOne();
    }

    async deleteOrder(orderId): Promise<DeleteResult> {
        let refData = await this.getRef(orderId);
        // let refData = arrayData[0];
        refData.order_detail.forEach(od => {
            this.orderDetailService.deleteOrderDetail(od.id);
            // console.log("od ok");
        });
        let res = await this.OrderRepo.delete(orderId);
        await this.paymentService.deletePayment(refData.payment.id);
        // console.log("payment ok");
        await this.deliveryService.deleteDelivery(refData.delivery.id);
        // console.log("delivery ok");

        return res;
    }

    async getOrderById(orderID): Promise<Order> {
        // return this.OrderRepo.findOneBy({id: orderID});
        // return this.OrderRepo.findOne({where: {id: orderID}, relations: ['user', 'payment', 'delivery', 'order_detail']});
        return await this.OrderRepo
        .createQueryBuilder('order')
        .where('order.id = :orderId', { orderId: orderID })
        .leftJoin('order.user', 'user')
        .addSelect(['user.id', 'user.name', 'user.phone'])
        .leftJoinAndSelect('order.payment', 'payment')
        .leftJoinAndSelect('order.delivery', 'delivery')
        .leftJoinAndSelect('order.order_detail', 'order_detail')
        .leftJoin('order_detail.product', 'product')
        .addSelect(['product.id', 'product.name'])
        .getOne();
    }
}
