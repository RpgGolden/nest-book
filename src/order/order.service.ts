import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { OrderBook } from './models/order-book.model';
import { User } from 'src/user/models/user.model';
import { Book } from 'src/book/models/book.model';
import { CreateUserOrderDto } from './dto/user-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private orderModel: typeof Order,
    @InjectModel(OrderBook) private orderBookModel: typeof OrderBook,
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(Book) private bookModel: typeof Book,
  ) {}

  async createOrder(userId: string, createUserOrderDto: CreateUserOrderDto) {
    const { bookIds, quantities } = createUserOrderDto;

    // Создаем заказ
    const order = await this.orderModel.create({
      userId,
      quantity: 0, // Изначально количество и сумма заказа равны 0
      totalPrice: 0,
    });

    // Добавляем книги в заказ
    for (let i = 0; i < bookIds.length; i++) {
      const bookId = bookIds[i];
      const quantity = quantities[i];

      // Находим книгу по ID
      const book = await Book.findByPk(bookId);

      if (!book) {
        throw new Error(`Book with id ${bookId} not found`);
      }

      // Создаем запись в таблице OrderBook
      await this.orderBookModel.create({
        orderId: order.id,
        bookId: bookId,
        quantity: quantity,
      });

      // Обновляем количество и сумму заказа
      order.quantity += quantity;
      order.totalPrice += book.price * quantity;
    }

    // Сохраняем изменения в заказе
    await order.save();

    return order;
  }
}
