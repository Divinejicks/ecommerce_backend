import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { Role } from "generated/prisma";

export class UpdateUserRole {
    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    roles: Role[]

    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    userId: number
}