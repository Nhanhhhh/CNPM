import { Order } from 'src/orders/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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


  @OneToMany((type) => Order, (order) => order.user)
  public order: Order[]
}