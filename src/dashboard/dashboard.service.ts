import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async topThreeProducts() {
        const topProducts = await this.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: 3,
        });

        const topProductIds = topProducts.map((p) => p.productId);

        const productDetails = await this.prisma.product.findMany({
            where: { id: { in: topProductIds } },
        });

        const result = topProducts.map((p) => {
            const product = productDetails.find((prod) => prod.id === p.productId);
            return {
                ...product,
                quantitySold: p._sum.quantity,
            };
        });

        return result;
    }
}
