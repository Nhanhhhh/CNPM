import { Delivery } from 'src/delivery/delivery.entity';
import { Order_detail } from 'src/order_details/order_detail.entity';
import { Payment } from 'src/payments/payment.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, Timestamp, OneToMany } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  total: number;

  @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci' })
  note: string;

  @Column('float', {nullable: true })
  discount: number;

  @Column({nullable: true, default: () => 'CURRENT_TIMESTAMP'})
  create_at: Date;

  @ManyToOne((type) => User, (user) => user.order)
  user: User

  @OneToMany((type) => Order_detail, (order_detail) => order_detail.order)
  order_detail: Order_detail[]

  @OneToOne((type) => Payment, (payment) => payment.order)
  @JoinColumn()
  payment: Payment

  @OneToOne((type) => Delivery, (delivery) => delivery.order)
  @JoinColumn()
  delivery: Delivery
}