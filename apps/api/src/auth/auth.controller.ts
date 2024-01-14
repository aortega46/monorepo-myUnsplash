import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { AuthService } from './auth.service'
import { LoginResponse } from './interfaces/login-response.interface'
import { User } from './entities/user.entity'
import { AuthGuard } from './guards/auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get('check')
  checkToken(@Request() req: Request): LoginResponse {
    const user = req['user'] as User
    return {
      user,
      token: this.authService.getJWT({ id: user._id }),
    }
  }
}
