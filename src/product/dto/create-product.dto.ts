import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description?: string;

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsNumber()
    @Min(0)
    @ApiProperty()
    stock: number;

    @IsBoolean()
    @ApiProperty()
    isPublished: boolean;

    @IsNumber()
    @ApiProperty()
    categoryId: number;
}
