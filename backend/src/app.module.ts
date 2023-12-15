import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsService } from './order_details/order_details.service';
import { OrderDetailsController } from './order_details/order_details.controller';
import { OrderDetailsModule } from './order_details/order_details.module';
import { PaymentsModule } from './payments/payments.module';
import { DeliveryModule } from './delivery/delivery.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'cnpm',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), ProductsModule, OrdersModule, OrderDetailsModule, PaymentsModule, UsersModule, DeliveryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
