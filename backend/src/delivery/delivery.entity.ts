import { Order } from "src/orders/order.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;
  
  @Column()
  price: number;

  @OneToOne((type) => Order, (order) => order.delivery)
  @JoinColumn()
  order: Order
}