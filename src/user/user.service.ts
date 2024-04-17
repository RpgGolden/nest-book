import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/user-dto';
import { Order } from 'src/order/models/order.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, money } = createUserDto;

    const user = await this.userModel.create({
      name,
      email,
      money,
    });

    return user;
  }

  async findAllOrders(userId: string) {
    const userOrders = await this.userModel.findOne({
      where: { id: userId },
      include: { model: Order },
    });
    return userOrders;
  }

  async getUserById(id: string) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async completeOrder(orderId: string) {
    const order = await this.orderModel.findOne({ where: { id: orderId } });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === true) {
      throw new Error('Order already completed');
    }

    order.status = true;
    await order.save();

    const user = await this.userModel.findByPk(order.userId, {
      include: { model: Order },
    });
    if (!user) {
      throw new Error('User not found');
    }

    user.money = user.money - order.totalPrice;
    await user.save();

    return user;
  }
}
