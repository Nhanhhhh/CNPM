import { Order } from 'src/orders/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({charset: 'utf8', collation: 'utf8_general_ci'})
  name: string;

  @Column({charset: 'utf8', collation: 'utf8_general_ci'})
  status: string;

  // @OneToOne((type) => Order, (order) => order.payment)
  // @JoinColumn()
  // order: Order

}