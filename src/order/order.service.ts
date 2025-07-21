import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async createOrder(userId: number, dto: CreateOrderDto) {
        const order = await this.prisma.order.create({
            data: {
                user: { connect: { id: userId } },
                totalAmount: dto.totalAmount,
                orderItems: {
                    create: dto.items.map(item => ({
                        product: { connect: { id: item.productId } },
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: { orderItems: true },
        });

        return order;
    }

    async findAll() {
        const orders = await this.prisma.order.findMany({
            include: { orderItems: true },
        });

        return orders;
    }

    async getAllMyOrders(userId: number) {
        const orders = await this.prisma.order.findMany({
            where: {
                userId
            },
            include: { orderItems: true },
        });

        return orders;
    }

    async getAllMyOrdersPaginated(userId: number, page: number, pageSize: number) {
        const skip = (page - 1) * pageSize;

        const [orders, total] = await this.prisma.$transaction([
            this.prisma.order.findMany({
                where: { userId },
                skip,
                take: pageSize,
                orderBy: { createdAt: "desc" },
                include: { orderItems: true },
            }),
            this.prisma.order.count({ where: { userId } }),
        ]);

        return {
            data: orders,
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        };
    }

    async findOne(id: number) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { orderItems: true },
        });

        return order;
    }

    async deleteOrder(id: number, userId: number) {
        await this.prisma.order.delete({ where: { id, userId } });
    }

    async getCount(): Promise<number> {
        const count = await this.prisma.order.count()
        return count;
    }

    async getUserOrderCount(userId: number) : Promise<number> {
        const count = await this.prisma.order.count({ where: { user: { id: userId } } });
        return count
    }
}
