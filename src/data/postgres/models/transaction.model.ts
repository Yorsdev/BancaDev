import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.model';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn({ type: 'timestamp' })
  transaction_date!: Date;

  @ManyToOne(() => User, (user) => user.sentTransactions)
  sender!: User;

  @ManyToOne(() => User, (user) => user.receivedTransactions)
  receiver!: User;
}
