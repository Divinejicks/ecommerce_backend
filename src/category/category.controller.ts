import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { Role } from 'generated/prisma';
import { CategoryDto, EditCategoryDto } from './dto';

@ApiTags("Category")
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Roles([Role.ADMIN])
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Get("get-all")
    @ApiOperation({summary: "Get all categories"})
    getAllCategories(){
        return this.categoryService.getAllCategories()
    }

    @Post("create")
    @ApiOperation({summary: "Create category"})
    createCategory(@Body() dto: CategoryDto){
        return this.categoryService.createCategory(dto)
    }

    @Patch("update-category")
    @ApiOperation({summary: "Update category"})
    updateCategory(@Body() dto: EditCategoryDto){
        return this.categoryService.updateCategory(dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(":id")
    @ApiOperation({summary: "Delete category"})
    deleteCategory(@Param('id', ParseIntPipe) id: number){
        return this.categoryService.deleteCategory(id)
    }

}
