import {
  Column,
  Model,
  Table,
  DataType,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize'; // Используем корректный путь к UUIDV4
import { Book } from 'src/book/models/book.model';
import { Order } from 'src/order/models/order.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    unique: true,
    validate: {
      isEmail: { msg: 'Must be a valid email address' },
    },
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 10000,
    validate: {
      min: { args: [0], msg: 'Money cannot be negative' },
    },
  })
  money: number;

  @HasMany(() => Order)
  orders: Order[];
}
