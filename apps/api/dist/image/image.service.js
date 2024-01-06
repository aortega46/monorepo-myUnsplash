"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const image_entity_1 = require("./entities/image.entity");
let ImageService = class ImageService {
    constructor(imageModel) {
        this.imageModel = imageModel;
    }
    async create(createImageDto) {
        try {
            const newImage = new this.imageModel({
                id: (0, crypto_1.randomUUID)(),
                ...createImageDto,
            });
            const image = this.imageModel.create(newImage);
            if (!image)
                throw new common_1.ConflictException("Can't be created");
            return image;
        }
        catch (error) {
            if (error.status)
                throw error;
            throw new common_1.BadRequestException();
        }
    }
    findAll() {
        return this.imageModel.find();
    }
    async findOne(id) {
        try {
            const image = await this.imageModel.findById(id);
            if (!image)
                throw new common_1.NotFoundException('Image does not exist');
            return image;
        }
        catch (error) {
            if (error.status)
                throw error;
            throw new common_1.BadRequestException();
        }
    }
    async remove(id) {
        try {
            const imageDeleted = await this.imageModel.findByIdAndDelete(id);
            if (!imageDeleted)
                throw new common_1.NotFoundException('Image does not exist');
            return imageDeleted;
        }
        catch (error) {
            if (error.status)
                throw error;
            throw new common_1.BadRequestException();
        }
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(image_entity_1.Image.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ImageService);
//# sourceMappingURL=image.service.js.map