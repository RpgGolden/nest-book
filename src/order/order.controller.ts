import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateUserOrderDto } from './dto/user-order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post(':userId')
  async createOrder(
    @Param('userId') userId: string,
    @Body() createUserOrderDto: CreateUserOrderDto,
  ) {
    const order = await this.orderService.createOrder(
      userId,
      createUserOrderDto,
    );
    return order;
  }
}
