import { UUIDV4 } from 'sequelize';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Book } from 'src/book/models/book.model';
import { User } from 'src/user/models/user.model';
import { OrderBook } from './order-book.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @Default(UUIDV4)
  @Column({ type: DataType.UUID, primaryKey: true, allowNull: false })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Book, () => OrderBook) // Многие ко многим с книгами через промежуточную модель
  books: Book[];

  @Column({ type: DataType.INTEGER })
  quantity: number;

  @Column({ type: DataType.FLOAT })
  totalPrice: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  status: boolean;
}
