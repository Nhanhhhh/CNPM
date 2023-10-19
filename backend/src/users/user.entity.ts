import { Order } from 'src/orders/order.entity';
import { Store } from 'src/stores/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;
  
  @Column()
  password: string;

  @Column({nullable: true})
  email: string;

  @Column()
  phone: string;

  @Column({nullable: true })
  address: string;

  // 0: admin, 1: user, 2: seller 
  @Column({nullable: true })
  role: number;

  @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci'})
  name: string;

  @OneToOne((type) => Store, (store) => store.user)
  @JoinColumn()
  store: Store

  @OneToMany((type) => Order, (order) => order.user)
  order: Order[]
}