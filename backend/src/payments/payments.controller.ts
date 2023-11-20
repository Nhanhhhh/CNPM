import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentsController {
    constructor(private PaymentsService: PaymentsService){}

    @Get()
    getAll(): Promise<Payment[]> {
        return this.PaymentsService.findAll();
    }

    @Get(':id') 
    getPaymentById(@Param() params) {
        return this.PaymentsService.getPaymentById(params.id);
    }

    @Put()
    updatePayment(@Body() payment: Payment) {
        return this.PaymentsService.updatePayment(payment);
    }

    @Delete(':id')
    deletePayment(@Param() params) {
        return this.PaymentsService.deletePayment(params.id);
    }

    @Post()
    createPayment(@Body() payment: Payment): Promise<Payment> {
        return this.PaymentsService.createPayment(payment);
    }
}
