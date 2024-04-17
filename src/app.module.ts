import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/models/user.model';
import { Book } from './book/models/book.model';
import { Author } from './author/models/author.model';
import { AuthorBook } from './author/models/author-book.model';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { Order } from './order/models/order.model';
import { AuthorController } from './author/author.controller';
import { AuthorService } from './author/author.service';
import { OrderBook } from './order/models/order-book.model';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([
      User,
      Book,
      Author,
      AuthorBook,
      Order,
      OrderBook,
    ]),
  ],
  controllers: [
    AppController,
    BookController,
    UserController,
    OrderController,
    AuthorController,
  ],
  providers: [
    AppService,
    UserService,
    BookService,
    OrderService,
    AuthorService,
  ],
})
export class AppModule {}
