import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsModule } from 'src/order_details/order_details.module';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { OrdersController } from './orders.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderDetailsModule, DeliveryModule, PaymentsModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
