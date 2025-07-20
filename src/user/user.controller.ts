import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { Role, User } from 'generated/prisma';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { EditUserDto, UpdateUserRole } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService){}

    @Roles([Role.USER])
    @Get('user-info')
    @ApiOperation({summary: "Get Current user"})
    getUserInfo(@GetUser() user: User) {
        return user;
    }

    @Roles([Role.USER])
    @Patch("edit-user")
    @ApiOperation({summary: "Edit user information"})
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto){
        return this.userService.editUser(userId, dto)
    }

    @Roles([Role.ADMIN]) 
    @Get('all-users')
    @ApiOperation({summary: "Get all users"})
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @Roles([Role.ADMIN])
    @Patch('update-user-role')
    @ApiOperation({summary: "Updating user's role"})
    updateUserRole(@Body() dto: UpdateUserRole) {
        return this.userService.updateUserRole(dto)
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Roles([Role.ADMIN])
    @Delete(':id')
    @ApiOperation({summary: "Delete and existing user"})
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id)
    }
}
