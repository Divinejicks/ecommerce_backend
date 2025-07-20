import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}

    async createProduct(dto: CreateProductDto) {
        const product = await this.prisma.product.create({ data: dto });
        return product;
    }

    async findAll() {
        const products = await this.prisma.product.findMany();
        return products;
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        return product;
    }

    async updateProduct(dto: EditProductDto) {
        const product = await this.prisma.product.update({
            where: {
                id: dto.id
            },
            data: {
                ...dto
            }
        });
        return product;
    }

    async deleteProduct(id: number) {
        await this.prisma.product.delete({ where: { id } });
    }
}
