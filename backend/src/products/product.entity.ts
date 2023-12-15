import { Order_detail } from 'src/order_details/order_detail.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, CreateDateColumn,UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column({charset: 'utf8', collation: 'utf8_general_ci'})
  name: string;
  
  @Column({charset: 'utf8', collation: 'utf8_general_ci'})
  description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // @UpdateDateColumn()
  latestChange: Date;

  // @OneToOne((type) => Order_detail, (order_detail) => order_detail.product)
  // @JoinColumn()
  // order_detail: Order_detail
}