/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateImageDto } from './dto/create-image.dto';
import { Model } from 'mongoose';
import { Image } from './entities/image.entity';
export declare class ImageService {
    private imageModel;
    constructor(imageModel: Model<Image>);
    create(createImageDto: CreateImageDto): Promise<Image>;
    findAll(): Promise<Image[]>;
    findOne(id: string): Promise<Image>;
    remove(id: string): Promise<import("mongoose").ModifyResult<import("mongoose").Document<unknown, {}, Image> & Image & Required<{
        _id: string;
    }>>>;
}
