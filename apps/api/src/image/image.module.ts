import { Module } from '@nestjs/common'
import { ImageService } from './image.service'
import { ImageController } from './image.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Image, ImageSchema } from './entities/image.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
    ]),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
