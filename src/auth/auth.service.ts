import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private Prisma: PrismaService) {}

  async register(createAuthDto: Prisma.UserCreateInput): Promise<User> {
    try {
      const userExisted = await this.Prisma.user.findUnique({
        where: { email: createAuthDto.email },
      });

      if (userExisted) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const passwordHas = await bcrypt.hash(createAuthDto.password, 10);
      createAuthDto.password = passwordHas;

      const res = await this.Prisma.user.create({
        data: createAuthDto,
      });

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async login(createAuthDto: Prisma.UserCreateInput): Promise<string> {
    try {
      const user = await this.Prisma.user.findFirst({
        where: {
          OR: [{ email: createAuthDto.email }, { name: createAuthDto.name }],
        },
      });
      if (!user) {
        throw new HttpException(
          'User Not Found or Empty',
          HttpStatus.NOT_FOUND,
        );
      }
      const validateAuth = await bcrypt.compare(
        createAuthDto.password,
        user.password,
      );

      if (!validateAuth) {
        throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      }

      const Payload = {
        name: user.name,
        role: user.role,
        profile_pic: user.profile_pic,
        email: user.email,
      };

      const token = jwt.sign(Payload, process.env.SECRET_KEY, {
        expiresIn: '1d',
      });
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async checkAuth(token: string): Promise<any> {
    try {
      if (!token) {
        throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
      }
      const decode = jwt.verify(token, process.env.SECRET_KEY);
      return {
        name: decode.name,
        role: decode.role,
        profile_pic: decode.profile_pic,
        email: decode.email,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
