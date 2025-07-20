import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, OrderService, ProductService, UserService]
})
export class DashboardModule {}
