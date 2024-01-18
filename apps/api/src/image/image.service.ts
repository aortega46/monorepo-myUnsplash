import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateImageDto } from './dto/create-image.dto'
import { randomUUID as uuid } from 'crypto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Image } from './entities/image.entity'
import { UpdateImageDto } from './dto/update-image.dto'

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    try {
      const newImage = new this.imageModel({
        id: uuid(),
        ...createImageDto,
      })

      const image = this.imageModel.create(newImage)
      if (!image) throw new ConflictException("Can't be created")
      return image
    } catch (error) {
      if (error.status) throw error
      throw new BadRequestException()
    }
  }

  findAll(): Promise<Image[]> {
    return this.imageModel.find().sort({ _id: -1 })
  }

  async findByLabel(label: string) {
    try {
      const regex = new RegExp(label, 'gi')
      const image = await this.imageModel.find({ label: regex })
      if (!image) throw new NotFoundException('Image does not exist')
      return image
    } catch (error) {
      if (error.status) throw error
      throw new BadRequestException()
    }
  }

  async remove(id: string) {
    try {
      const imageDeleted = await this.imageModel.findByIdAndDelete(id)
      if (!imageDeleted) throw new NotFoundException('Image does not exist')
      return imageDeleted
    } catch (error) {
      if (error.status) throw error
      throw new BadRequestException()
    }
  }

  async update(id: string, updateImageDto: UpdateImageDto) {
    try {
      const imageUpdated = await this.imageModel.findByIdAndUpdate(
        id,
        updateImageDto,
        {
          new: true,
        },
      )
      if (!imageUpdated) throw new NotFoundException('Image not found')
      return imageUpdated
    } catch (error) {
      if (error.status) throw error
      throw new BadRequestException()
    }
  }
}
