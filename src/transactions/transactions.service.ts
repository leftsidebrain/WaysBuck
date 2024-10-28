import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private Prisma: PrismaService) {}
  async create(createTransactionDto: Prisma.OrderCreateInput) {
    const res = await this.Prisma.order.create({
      data: createTransactionDto,
    });
    return res;
  }

  async findAll() {
    return await this.Prisma.order.findMany();
  }

  findOne(id: number) {
    const exists = this.Prisma.order.findFirst({
      where: {
        id,
      },
    });

    if (!exists) {
      return 'data not found';
    }

    return this.Prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
