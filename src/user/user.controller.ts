import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/findAll')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post('/createUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userService.createUser(createUserDto);
      return createdUser;
    } catch (error) {
      console.error(
        'Невозможно создать пользователя, проверьте правильность введенных данных',
        error,
      );
    }
  }
  @Get(':userId/orders')
  async findAllOrders(@Param('userId') userId: string) {
    const orders = await this.userService.findAllOrders(userId);
    return orders;
  }
  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    const user = await this.userService.getUserById(userId);
    return user;
  }

  @Post(':orderId/complete')
  async completeOrder(@Param('orderId') orderId: string) {
    const user = await this.userService.completeOrder(orderId);
    return user;
  }
}
