import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import { ImageService } from './image.service'
import { CreateImageDto } from './dto/create-image.dto'

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  async create(@Body() createImageDto: CreateImageDto) {
    const newUrl = createImageDto.url.includes('http')
      ? createImageDto.url
      : `https://${createImageDto.url}`

    const newCreateImageDto = { ...createImageDto, url: newUrl }

    try {
      const image = await fetch(newUrl).catch(() => {
        throw new BadRequestException('URL not valid')
      })

      const buff = await image.blob()
      const isImage = buff.type.startsWith('image/')

      if (isImage) return this.imageService.create(newCreateImageDto)
      else throw new BadRequestException('URL does not conatain an image')
    } catch (error) {
      if (error.status) throw error
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  @Get()
  findAll(@Query('q') query: string) {
    if (!!query) return this.imageService.findByLabel(query)
    return this.imageService.findAll()
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(id)
  }
}
