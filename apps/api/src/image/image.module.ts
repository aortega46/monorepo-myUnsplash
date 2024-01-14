import { Module } from '@nestjs/common'
import { ImageService } from './image.service'
import { ImageController } from './image.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Image, ImageSchema } from './entities/image.entity'
import { AuthService } from 'src/auth/auth.service'
import { User, UserSchema } from 'src/auth/entities/user.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService, AuthService],
})
export class ImageModule {}
