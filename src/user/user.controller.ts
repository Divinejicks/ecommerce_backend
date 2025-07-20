import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Role, User } from 'generated/prisma';
import { GetUser, Roles } from 'src/auth/decorator';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
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

    @Patch("edit-user")
    @ApiOperation({summary: "Edit user information"})
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto){
        return this.userService.editUser(userId, dto)
    }

    @Roles([Role.ADMIN]) 
    @Get('all-users')
    @ApiOperation({summary: "Get all users"})
    getAllUsers(){
        return "This is getting all users"
    }
}
