import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderBook } from './models/order-book.model';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderBook])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
