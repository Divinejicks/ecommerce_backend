import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto, EditCategoryDto } from './dto';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async getAllCategories() {
        return this.prisma.category.findMany({})
    }

    // category.service.ts
    async getAllCategoriesPaginated(page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const [data, total] = await Promise.all([
            this.prisma.category.findMany({
                skip,
                take: pageSize,
                orderBy: { createdAt: 'desc' }, 
            }),
            this.prisma.category.count(),
        ]);

        return {
            data,
            total,
        };
    }


    async createCategory(dto: CategoryDto) {
        try {
            const category = await this.prisma.category.create({
                data: {
                    name: dto.name
                }
            })

            return category;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException(`Category with the name ${dto.name} already exists.`);
                }
            }
            throw error;
        }
    }

    async updateCategory(dto: EditCategoryDto) {
        const category = await this.prisma.category.update({
            where: {
                id: dto.id
            },
            data: {
                ...dto
            }
        })

        return category;
    }

    async deleteCategory(id: number) {
        await this.prisma.category.delete({
            where: {
                id: id
            }
        })
    }
}
