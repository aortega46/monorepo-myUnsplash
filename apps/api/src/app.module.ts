import { Module } from '@nestjs/common'
import { ImageModule } from './image/image.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ImageModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      dbName: process.env.MONGO_DB_NAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
