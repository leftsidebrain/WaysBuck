import { Module } from '@nestjs/common';
import { TopingService } from './toping.service';
import { TopingController } from './toping.controller';
import { PrismaService } from 'src/prisma.service';
import { CloudinaryService } from 'src/config/cloudinary.service';

@Module({
  controllers: [TopingController],
  providers: [TopingService,PrismaService,CloudinaryService],
})
export class TopingModule {}
