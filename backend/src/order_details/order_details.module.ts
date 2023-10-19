import { Module } from '@nestjs/common';
import { Order_detail } from './order_detail.entity';
import { OrderDetailsService } from './order_details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailsController } from './order_details.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Order_detail])],
    providers: [OrderDetailsService],
    controllers: [OrderDetailsController],
})
export class OrderDetailsModule {}
