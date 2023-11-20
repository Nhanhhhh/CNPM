import { Injectable } from '@nestjs/common';
import { Order_detail } from './order_detail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OrderDetailsService {
    constructor(
        @InjectRepository(Order_detail)
        private readonly Order_detailRepo: Repository<Order_detail>,
    ) {}

    async findAll(): Promise<Order_detail[]> {
        return await this.Order_detailRepo.find();
    }

    async updateOrderDetail(order_detail: Order_detail): Promise<UpdateResult> {
        return await this.Order_detailRepo.update(order_detail.id, order_detail);
    }

    async deleteOrderDetail(id): Promise<DeleteResult> {
        return await this.Order_detailRepo.delete(id);
    }

    async getOrderDetailById(order_detailID): Promise<Order_detail> {
        return this.Order_detailRepo.findOneBy({id: order_detailID});
    }

    async createOrderDetail(order_detail: Order_detail): Promise<Order_detail> {
        return await this.Order_detailRepo.save(order_detail);
    }
}
