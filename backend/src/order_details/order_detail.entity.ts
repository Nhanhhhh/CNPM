import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Order_detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToOne((type) => Product, (product) => product.order_detail)
  @JoinColumn()
  product: Product

  @ManyToOne((type) => Order, (order) => order.order_detail)
  order: Order
  
}