import { Injectable } from '@nestjs/common';
import { Delivery } from './delivery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class DeliveryService {
    constructor(
        @InjectRepository(Delivery)
        private readonly DeliveryRepo: Repository<Delivery>,
    ) {}

    async findAll(): Promise<Delivery[]> {
        return await this.DeliveryRepo.find();
    }

    async updateDelivery(delivery: Delivery): Promise<UpdateResult> {
        return await this.DeliveryRepo.update(delivery.id, delivery);
    }

    async deleteDelivery(id): Promise<DeleteResult> {
        return await this.DeliveryRepo.delete(id);
    }

    async getDeliveryById(deliveryID): Promise<Delivery> {
        return this.DeliveryRepo.findOneBy({id: deliveryID});
    }

    async createDelivery(delivery: Delivery): Promise<Delivery> {
        return await this.DeliveryRepo.save(delivery);
    }
}