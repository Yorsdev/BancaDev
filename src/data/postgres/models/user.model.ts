// import { Transaction } from './transaction.model';
// import { Exclude } from 'class-transformer';
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   OneToMany,
//   BaseEntity,
// } from 'typeorm';

// export enum UserRole {
//   USER = 'user',
//   ADMIN = 'admin',
// }

// @Entity('users')
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id!: string;

//   @Column('varchar', {
//     length: 150,
//   })
//   name!: string;

//   @Column('varchar', {
//     length: 150,
//     unique: true,
//     nullable: false,
//   })
//   email!: string;

//   @Exclude()
//   @Column('varchar', {
//     length: 255,
//     nullable: false,
//   })
//   password!: string;

//   @Column({ length: 20 })
//   account_number!: string;

//   @Column('decimal', { precision: 10, scale: 2, default: 0 })
//   balance!: number;

//   @CreateDateColumn({ type: 'timestamp' })
//   created_at!: Date;

//   @OneToMany(() => Transaction, (transaction) => transaction.sender)
//   sentTransactions!: Transaction[];

//   @OneToMany(() => Transaction, (transaction) => transaction.receiver)
//   receivedTransactions!: Transaction[];
// }
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './transaction.model';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  static findOne(arg0: { where: { id: string } }) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ unique: true, length: 100 })
  email!: string;

  @Column('text')
  password!: string;

  @Column({ length: 20 })
  account_number!: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  sentTransactions!: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.receiver)
  receivedTransactions!: Transaction[];
}
