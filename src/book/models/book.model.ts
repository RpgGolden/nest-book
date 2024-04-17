import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  Default,
  DataType,
  BelongsToMany,
  UpdatedAt,
  CreatedAt,
  AllowNull,
} from 'sequelize-typescript';
import { Author } from '../../author/models/author.model';
import { UUIDV4 } from 'sequelize'; // Используем корректный путь к UUIDV4
import { User } from 'src/user/models/user.model';
import { AuthorBook } from 'src/author/models/author-book.model';
import { Order } from 'src/order/models/order.model';
import { OrderBook } from 'src/order/models/order-book.model';

@Table({ tableName: 'books' })
export class Book extends Model<Book> {
  @Default(UUIDV4)
  @Column({ type: DataType.UUID, primaryKey: true, allowNull: false })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @BelongsToMany(() => Author, () => AuthorBook)
  authors: Author[];

  @BelongsToMany(() => Order, () => OrderBook)
  orders: Order[];
}
