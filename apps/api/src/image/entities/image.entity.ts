import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Image {
  _id?: string;

  @Prop({ minlength: 4, required: true })
  label: string;

  @Prop({ required: true })
  url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image)
