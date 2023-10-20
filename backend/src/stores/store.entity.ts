import { Order } from 'src/orders/order.entity';
import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, charset: 'utf8', collation: 'utf8_general_ci'})
  address: string;

  @Column({nullable: true})
  phone: string;

  @Column()
  name: string;

  @OneToOne((type) => User, (user) => user.store)
  @JoinColumn()
  user: User

  @OneToMany((type) => Product, (product) => product.store)
  product: Product[]

  @OneToMany((type) => Order, (order) => order.store)
  order: Order[]
}