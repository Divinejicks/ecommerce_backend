import { IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CreateOrderItemDto {
    @IsNumber()
    @ApiProperty()
    productId: number;

    @IsNumber()
    @ApiProperty()
    quantity: number;

    @IsNumber()
    @ApiProperty()
    price: number;
}

export class CreateOrderDto {
    @IsNumber()
    @ApiProperty()
    totalAmount: number;

    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    @ArrayMinSize(1)
    @ApiProperty()
    items: CreateOrderItemDto[];
}
