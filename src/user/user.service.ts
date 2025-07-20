import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto, UpdateUserRole } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    private readonly safeUserSelect = {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        roles: true,
        createdAt: true
    };

    async getAllUsers() {
        const users = await this.prisma.user.findMany({
            select: this.safeUserSelect
        })

        return users
    }

    async editUser(userId: number, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...dto
            }
        })

        const { passwordHash, ...withoutPasswordHash } = user
        return withoutPasswordHash;
    }

    async updateUserRole(dto: UpdateUserRole) {
        const user = await this.prisma.user.update({
            where: {
                id: dto.userId
            },
            data: {
                roles: dto.roles
            }
        })

        if (!user) {
            throw new ForbiddenException("User Not Found in the system.")
        }

        const { passwordHash, ...withoutPasswordHash } = user
        return withoutPasswordHash;
    }

    async deleteUser(id: number) {
        await this.prisma.user.delete({
            where: {
                id: id
            }
        })
    }
}
