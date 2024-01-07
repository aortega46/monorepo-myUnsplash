import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ImageService } from './image.service'
import { CreateImageDto } from './dto/create-image.dto'
import { query } from 'express'

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto)
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
