import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  Register(@Body() createAuthDto: Prisma.UserCreateInput) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  Login(@Body() createAuthDto: Prisma.UserCreateInput) {
    return this.authService.login(createAuthDto);
  }
  @Post('checkAuth')
  async checkout(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1]; // Mengambil token dari header

    if (!token) {
      throw new HttpException('Token is missing', HttpStatus.UNAUTHORIZED);
    }

    // Memverifikasi token
    const user = await this.authService.checkAuth(token);

    // Melakukan proses checkout jika token valid
    return {
      message: 'Checkout successful',
      user: user,
    };
  }
}
