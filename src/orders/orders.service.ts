import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private Prisma: PrismaService) {}

  create(createOrderDto: Prisma.OrderCreateInput): Promise<Order> {
    const res = this.Prisma.order.create({
      data: createOrderDto,
    });
    return res;
  }

  async findAll(): Promise<Order[]> {
    const res = await this.Prisma.order.findMany();
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
