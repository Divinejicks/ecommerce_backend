import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto, EditProductDto } from './dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async createProduct(dto: CreateProductDto) {
        const product = await this.prisma.product.create({ data: dto });
        return product;
    }

    async findAll() {
        const products = await this.prisma.product.findMany();
        return products;
    }

    async findAllPagination(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const [data, total] = await Promise.all([
            this.prisma.product.findMany({
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' },
                include: {
                    category: true,
                },
            }),
            this.prisma.product.count(),
        ]);

        return {
            data,
            total,
        };
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

    async getCount(): Promise<number> {
        const count = await this.prisma.product.count()
        return count
    }
}
