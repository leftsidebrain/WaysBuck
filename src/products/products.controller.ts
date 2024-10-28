import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/config/cloudinary.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: Prisma.ProductCreateInput,
  ) {
    try {
      if (!file) {
        throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
      }
      const uploadResult = await this.cloudinaryService.uploadImage(file);

      return await this.productsService.create({
        name: createProductDto.name,
        price: Number(createProductDto.price),
        image: uploadResult.secure_url,
      });
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new Error(`Failed to retrieve products: ${error.message}`);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // Gunakan ParseIntPipe
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new Error(`Failed to retrieve product: ${error.message}`);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, // Gunakan ParseIntPipe
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // Gunakan ParseIntPipe
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}
