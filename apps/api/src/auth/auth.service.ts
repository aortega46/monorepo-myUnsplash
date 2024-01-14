import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './entities/user.entity'
import { Model } from 'mongoose'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import { LoginResponse } from './interfaces/login-response.interface'
import { JwtPayload } from './interfaces/jwt-payload'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const { email, password } = loginDto

    const user = await this.userModel.findOne({ email })

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials')
    }

    const { password: _, ...rest } = user.toJSON()

    return {
      user: rest,
      token: this.getJWT({ id: user.id }),
    }
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id)
    const { password: _, ...rest } = user.toJSON()
    return rest
  }

  getJWT(payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }
}
