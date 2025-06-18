import { Transaction } from './transaction.model';
import { Exclude, Expose } from 'class-transformer';
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
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Expose()
  @Column({ length: 100 })
  name!: string;

  @Expose()
  @Column({ unique: true, length: 100 })
  email!: string;

  @Exclude()
  @Column('text')
  password!: string;

  @Expose()
  @Column({ length: 20 })
  account_number!: string;

  @Expose()
  @Column('enum', {
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Expose()
  @Column('boolean', {
    nullable: false,
    default: true,
  })
  status!: boolean;

  @Expose()
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Expose()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  sentTransactions!: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiver)
  receivedTransactions!: Transaction[];
}
