import { Transaction } from './transaction.model';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm';

export enum UserRole {
  USER = 'client',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Exclude()
  @Column('text')
  password!: string;

  @Column({ length: 20 })
  account_number!: string;

  @Column('enum', {
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column('boolean', {
    nullable: false,
    default: true,
  })
  status!: boolean;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  sentTransactions!: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiver)
  receivedTransactions!: Transaction[];
}
