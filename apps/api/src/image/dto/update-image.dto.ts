import { IsString, MinLength } from 'class-validator'

export class UpdateImageDto {
  @IsString()
  @MinLength(4)
  label: string
}
