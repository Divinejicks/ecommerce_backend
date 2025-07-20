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
