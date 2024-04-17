import { UUIDV4 } from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from './order.model';
import { Book } from 'src/book/models/book.model';

@Table({ tableName: 'order_books' })
export class OrderBook extends Model<OrderBook> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: UUIDV4 })
  id: string;

  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  orderId: string;

  @ForeignKey(() => Book)
  @Column({ type: DataType.UUID })
  bookId: string;

  @Column({ type: DataType.INTEGER })
  quantity: number;
}
