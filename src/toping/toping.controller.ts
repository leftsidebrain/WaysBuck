import { Prisma } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TopingService } from './toping.service';
import { CloudinaryService } from 'src/config/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('toping')
export class TopingController {
  constructor(
    private readonly topingService: TopingService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createTopingDto: Prisma.ToppingCreateInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new HttpException('File not found', HttpStatus.BAD_REQUEST);
      }
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      return await this.topingService.create({
        name: createTopingDto.name,
        price: Number(createTopingDto.price),
        image: uploadResult.secure_url,
      });
    } catch (error) {
      throw new Error(`Failed to create toping: ${error.message}`);
    }
  }

  @Get()
  findAll() {
    return this.topingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopingDto: Prisma.ToppingUpdateInput,
  ) {
    return this.topingService.update(+id, updateTopingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topingService.remove(+id);
  }
}
