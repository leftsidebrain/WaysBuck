import { CloudinaryService } from 'src/config/cloudinary.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Topping } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateTopingDto } from './dto/update-toping.dto';

@Injectable()
export class TopingService {
  constructor(private Prisma: PrismaService) {}
  async create(createTopingDto: Prisma.ToppingCreateInput): Promise<Topping> {
    const res = await this.Prisma.topping.create({
      data: createTopingDto,
    });
    return res;
  }

  async findAll(): Promise<Topping[]> {
    return this.Prisma.topping.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} toping`;
  }

  update(id: number, updateTopingDto: UpdateTopingDto) {
    return `This action updates a #${id} toping`;
  }

  remove(id: number) {
    return `This action removes a #${id} toping`;
  }
}
