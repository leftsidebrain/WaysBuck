import { Controller, Post, Body } from '@nestjs/common';
import { MidtransService } from './midtrans.service';

@Controller('midtrans')
export class MidtransController {
  constructor(private readonly midtransService: MidtransService) {}

  @Post('create')
  async createTransaction(@Body() body: any) {
    return await this.midtransService.createTransaction(body);
  }
}
