import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EditCategoryDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    id: number
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
}