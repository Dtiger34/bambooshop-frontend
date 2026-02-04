import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
  ) {
    try {
      const user = await this.authService.register(
        body.email,
        body.password,
        body.firstName,
        body.lastName,
      );
      return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  async login(
    @Body()
    body: {
      email: string;
      password: string;
    },
  ) {
    try {
      const result = await this.authService.login(body.email, body.password);
      return {
        message: 'Login successful',
        ...result,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }
  }
}
