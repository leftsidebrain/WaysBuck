import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CloudinaryService } from 'src/config/cloudinary.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService, CloudinaryService],
})
export class ProductsModule {}
