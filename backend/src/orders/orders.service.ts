import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Order_detail } from 'src/order_details/order_detail.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly OrderRepo: Repository<Order>) {}

    async createOrder(order: Order): Promise<Order> {
        return await this.OrderRepo.save(order);
    }

    async findAll(): Promise<Order[]> {
        return await this.OrderRepo.find();
    }

    async updateOrder(order: Order): Promise<UpdateResult> {
        return await this.OrderRepo.update(order.id, order);
    }

    async deleteOrder(id): Promise<DeleteResult> {
        return await this.OrderRepo.delete(id);
    }

    async getOrderById(orderID): Promise<Order> {
        return this.OrderRepo.findOneBy({id: orderID});
    }
}
