import { Order_detail } from 'src/order_details/order_detail.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  // @Column('float')
  // price: number;

  @Column()
  type: string;

  @Column({charset: 'utf8', collation: 'utf8_general_ci'})
  name: string;

  @OneToOne((type) => Order_detail, (order_detail) => order_detail.product)
  @JoinColumn()
  order_detail: Order_detail
}