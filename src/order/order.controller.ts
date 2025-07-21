import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { OrderService } from './order.service';
import { GetUser, Roles } from 'src/auth/decorator';
import { Role } from 'generated/prisma';
import { CreateOrderDto } from './dto';

@ApiTags("Order")
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post("create")
    @ApiOperation({ summary: "Create and order" })
    @Roles([Role.USER])
    createOrder(@GetUser('id') userId: number, @Body() dto: CreateOrderDto) {
        return this.orderService.createOrder(userId, dto);
    }

    @Get("get-all")
    @ApiOperation({ summary: "Get all orders" })
    @Roles([Role.ADMIN])
    findAll() {
        return this.orderService.findAll();
    }

    @Get("get-all-my-orders")
    @ApiOperation({ summary: "Get all my orders" })
    @Roles([Role.USER])
    getAllMyOrders(@GetUser('id') userId: number) {
        return this.orderService.getAllMyOrders(userId);
    }

    @Get("get-all-my-orders-paginated")
    @ApiOperation({ summary: "Get all my orders paginated" })
    @Roles([Role.USER])
    getAllMyOrdersPaginated(
        @GetUser('id') userId: number,
        @Query('page', ParseIntPipe) page: number,
        @Query('pageSize', ParseIntPipe) pageSize: number,
    ) {
        const parsedPage = page || 1;
        const parsedSize = pageSize || 5;
        return this.orderService.getAllMyOrdersPaginated(userId, parsedPage, parsedSize);
    }

    @Get("get-all-orders-paginated")
    @ApiOperation({ summary: "Get all orders paginated" })
    @Roles([Role.USER])
    getAllOrdersPaginated(
        @Query('page', ParseIntPipe) page: number,
        @Query('pageSize', ParseIntPipe) pageSize: number,
    ) {
        const parsedPage = page || 1;
        const parsedSize = pageSize || 5;
        return this.orderService.getAllOrdersPaginated(parsedPage, parsedSize);
    }

    @Get(':id')
    @ApiOperation({ summary: "Get order by Id" })
    @Roles([Role.USER])
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: "Delete an order" })
    @Roles([Role.USER])
    deleteOrder(@Param('id', ParseIntPipe) id: number, @GetUser('id') userId: number) {
        return this.orderService.deleteOrder(id, userId);
    }
}
