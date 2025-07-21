import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from 'generated/prisma';
import { Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { DashboardService } from './dashboard.service';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';

@ApiTags("Dashboard")
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService,
        private orderService: OrderService,
        private userService: UserService,
        private productService: ProductService
    ) { }

    @Get("get-dashboard-data")
    @Roles([Role.ADMIN])
    @ApiOperation({ summary: "Get dashboard data for statistics" })
    async getAdminData() {
        const [totalOrders, totalUsers, totalProducts, topThreeProducts] =
            await Promise.all([
                this.orderService.getCount(),
                this.userService.getCount(),
                this.productService.getCount(),
                this.dashboardService.topThreeProducts(),
            ]);

        return {
            totalOrders,
            totalUsers,
            totalProducts,
            topThreeProducts,
        };
    }
}
