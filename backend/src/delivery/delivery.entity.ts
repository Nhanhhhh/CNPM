import { Order } from "src/orders/order.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci' })
  method: string;
  
  @Column()
  price: number;
  
  @Column()
  address: string;

  // @OneToOne((type) => Order, (order) => order.delivery)
  // @JoinColumn()
  // order: Order
}