import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { OrderDetailsModule } from 'src/order_details/order_details.module';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), OrderDetailsModule, DeliveryModule, PaymentsModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
