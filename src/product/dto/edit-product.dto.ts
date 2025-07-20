import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';

export class EditProductDto {
    @IsNumber()
    @ApiProperty()
    id: number

    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    @ApiProperty()
    stock?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isPublished?: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    categoryId?: number;
}
