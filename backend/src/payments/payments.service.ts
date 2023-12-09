import { Injectable } from '@nestjs/common';
import { Payment } from './payment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly PaymentsRepo: Repository<Payment>,
    ) {}

    async findAll(): Promise<Payment[]> {
        return await this.PaymentsRepo.find();
    }

    async updatePayment(payment: Payment): Promise<UpdateResult> {
        return await this.PaymentsRepo.update(payment.id, payment);
    }

    async deletePayment(id): Promise<DeleteResult> {
        return await this.PaymentsRepo.delete(id);
    }

    async getPaymentById(paymentId): Promise<Payment> {
        return this.PaymentsRepo.findOneBy({id: paymentId});
    }

    async createPayment(payment: Payment): Promise<Payment> {
        return await this.PaymentsRepo.save(payment);
    }
}
