import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Product } from './../../node_modules/.prisma/client/index.d';

@Injectable()
export class ProductsService {
  constructor(private Prisma: PrismaService) {}

  async create(createProductDto: Prisma.ProductCreateInput): Promise<Product> {
    const res = await this.Prisma.product.create({ data: createProductDto });
    return res;
  }

  async findAll(): Promise<Product[]> {
    const res = await this.Prisma.product.findMany();
    return res;
  }

  async findOne(id: number): Promise<Product> {
    const res = await this.getProductById(id);
    if (!res) {
      console.log('data not found');

      throw new HttpException('Data Not Found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    await this.getProductById(id);

    return await this.Prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    await this.getProductById(id); // Pengecekan data ada atau tidak

    await this.Prisma.product.delete({
      where: { id },
    });
    return `Product deleted`;
  }

  private async getProductById(id: number): Promise<Product> {
    const product = await this.Prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }
}
