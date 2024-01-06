import { IsString, IsUrl, MinLength } from 'class-validator'

export class CreateImageDto {
  @IsString()
  @MinLength(4)
  label: string

  @IsUrl()
  url: string
}
