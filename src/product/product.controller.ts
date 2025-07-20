import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { ProductService } from './product.service';
import { Roles } from 'src/auth/decorator';
import { Role } from 'generated/prisma';
import { CreateProductDto, EditProductDto } from './dto';

@ApiTags("Product")
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post("create")
    @Roles([Role.ADMIN])
    @ApiOperation({summary: "Create a product"})
    createProduct(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }

    @Get("get-all")
    @ApiOperation({summary: "get all product"})
    findAll() {
        return this.productService.findAll();
    }

    @Get('get-product-by-id:id')
    @ApiOperation({summary: "Get product by id"})
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Patch('update-product')
    @Roles([Role.ADMIN])
    @ApiOperation({summary: "update a product"})
    updateProduct( @Body() dto: EditProductDto) {
        return this.productService.updateProduct(dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @Roles([Role.ADMIN])
    @ApiOperation({summary: "Delete a product"})
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }
}
